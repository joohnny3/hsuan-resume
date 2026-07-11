param(
    [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = "Stop"
$issues = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$ok = New-Object System.Collections.Generic.List[string]

function Add-Issue([string]$Message) {
    $issues.Add($Message) | Out-Null
}

function Add-Warning([string]$Message) {
    $warnings.Add($Message) | Out-Null
}

function Add-Ok([string]$Message) {
    $ok.Add($Message) | Out-Null
}

function Read-Text([string]$Path) {
    if (Test-Path -LiteralPath $Path) {
        return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
    }
    return ""
}

function Has-UncheckedOpenQuestion([string]$SpecText) {
    return $SpecText -match "(?s)##\s+開放問題.*?-\s+\[\s\]"
}

function Get-RoadmapLine([string]$RoadmapText, [string]$ModuleId) {
    $escaped = [regex]::Escape($ModuleId)
    $match = [regex]::Match($RoadmapText, "(?m)^.*$escaped.*$")
    if ($match.Success) {
        return $match.Value
    }
    return ""
}

$DoneMarker = [string][char]0x2705
$TodoMarker = [string][char]0x2B1C
$SpeccedMarker = [char]::ConvertFromUtf32(0x1F4DD)
$ProgressMarker = [char]::ConvertFromUtf32(0x1F528)

$requiredFiles = @(
    ".dev-os/WORKFLOW_PROTOCOL.md",
    ".dev-os/config.yml",
    ".dev-os/README.md",
    ".dev-os/ROADMAP.md",
    ".dev-os/NOW.md",
    ".dev-os/STATE.md",
    ".dev-os/DECISIONS.md",
    ".dev-os/PHASE_PLAN.md"
)

foreach ($file in $requiredFiles) {
    $full = Join-Path $Root $file
    if (-not (Test-Path -LiteralPath $full)) {
        Add-Issue "Missing required file: $file. Restore it from the dev-os template before asking for next workflow steps."
    }
}

$configPath = Join-Path $Root ".dev-os/config.yml"
$configText = Read-Text $configPath
if ($configText -match "\[project-name\]|\[Phase X\]|\[Wave Y\]|\[pnpm|optional e2e command|# TODO|<your-") {
    Add-Warning ".dev-os/config.yml still contains bootstrap placeholders. Fill project name, phase/wave, and commands before active development."
}
if ($configText -and $configText -notmatch "conversation_layout") {
    Add-Warning ".dev-os/config.yml has no project.conversation_layout. Add conversation_layout: ide-only or split."
}
else {
    Add-Ok ".dev-os/config.yml contains conversation layout settings."
}

if ($configText -and $configText -notmatch "auto_commit_per_step") {
    Add-Warning ".dev-os/config.yml has no git.auto_commit_per_step (v0.5). Add auto_commit_per_step: true (or false if you prefer manual commits) and auto_push: false."
}

$statePath = Join-Path $Root ".dev-os/STATE.md"
$stateText = Read-Text $statePath
if ($stateText -match "\[Phase X|\[Wave Y|\[module-id\]|\[module name\]|\[SX\]") {
    Add-Warning ".dev-os/STATE.md still contains v0.5 dashboard placeholders. AI should overwrite it at the end of every step."
}
if ($stateText -and $stateText -notmatch "(?ms)^---\s*$.*?^---\s*$") {
    Add-Warning ".dev-os/STATE.md has no YAML frontmatter block. AI tooling expects frontmatter for machine-readable state."
}

$nowPath = Join-Path $Root ".dev-os/NOW.md"
$nowText = Read-Text $nowPath
if ($nowText -match "\[模組 ID\]|\[模組名稱\]|<模組ID>") {
    Add-Warning ".dev-os/NOW.md still contains task placeholders. Point it to a real module before implementation."
}

$roadmapPath = Join-Path $Root ".dev-os/ROADMAP.md"
$roadmapText = Read-Text $roadmapPath
if ($roadmapText -match "\[模組ID\]|\[填入|0 / X|0 / Y|0 / Z") {
    Add-Warning ".dev-os/ROADMAP.md may still contain bootstrap placeholders."
}

$specsDir = Join-Path $Root ".dev-os/specs"
if (Test-Path -LiteralPath $specsDir) {
    $specDirs = Get-ChildItem -LiteralPath $specsDir -Directory
    foreach ($dir in $specDirs) {
        $moduleId = $dir.Name
        $hasMini = Test-Path -LiteralPath (Join-Path $dir.FullName "MINI_SPEC.md")
        $standardFiles = @("SPEC.md", "PROMPT.md", "ACCEPTANCE.md", "STATUS.md")

        if (-not $hasMini) {
            foreach ($file in $standardFiles) {
                $full = Join-Path $dir.FullName $file
                if (-not (Test-Path -LiteralPath $full)) {
                    Add-Issue "Spec '$moduleId' is missing $file. Standard / Strict modules need the full four-file set."
                }
            }
        }

        $statusPath = Join-Path $dir.FullName "STATUS.md"
        $statusText = Read-Text $statusPath
        $isDone = $statusText -match "(?m)^\*\*狀態\*\*:\s*done\b"

        $specPath = Join-Path $dir.FullName "SPEC.md"
        $specText = Read-Text $specPath
        if ($specText) {
            if ($isDone -and (Has-UncheckedOpenQuestion $specText)) {
                Add-Issue "Spec '$moduleId' is done but SPEC.md still has unresolved Open Questions. Answer them during SPEC backfill."
            }
            if ($isDone -and $specText -match "以實際為準|具體名稱待定|TBD|TODO") {
                Add-Warning "Spec '$moduleId' is done but SPEC.md still contains unresolved wording such as TBD/TODO. Replace it with final implementation facts."
            }
            if (-not $hasMini -and $specText -notmatch "風險檢查") {
                Add-Warning "Spec '$moduleId' has no risk check section. Add the v1.2 30-second risk check."
            }
        }

        $promptPath = Join-Path $dir.FullName "PROMPT.md"
        $promptText = Read-Text $promptPath
        if ($promptText -match "<模組ID>|\[模組 ID\]") {
            Add-Issue "Spec '$moduleId' PROMPT.md still contains module-id placeholders. Replace them before execution."
        }

        $feedbackPath = Join-Path $dir.FullName "IMPLEMENTATION_FEEDBACK.md"
        $feedbackText = Read-Text $feedbackPath
        if ($isDone -and -not (Test-Path -LiteralPath $feedbackPath)) {
            Add-Warning "Spec '$moduleId' appears done but has no IMPLEMENTATION_FEEDBACK.md. Run Prompt 1 health check."
        }
        elseif ($isDone -and $feedbackText -notmatch "Design Deltas") {
            Add-Warning "Spec '$moduleId' IMPLEMENTATION_FEEDBACK.md has no Design Deltas section. Add it before Design Sync."
        }

        $acceptancePath = Join-Path $dir.FullName "ACCEPTANCE.md"
        $acceptanceText = Read-Text $acceptancePath
        if ($isDone -and $acceptanceText) {
            if ($acceptanceText -match "\[ \] 通過|\[ \] 已執行|\[ \] 每個 criterion 都有驗收證據") {
                Add-Warning "Spec '$moduleId' is done but ACCEPTANCE.md still has unchecked acceptance boxes."
            }
            if ($acceptanceText -match "\[填路徑\]|\[結果摘要\]|\[待補\]|\[截圖 / log / artifact 路徑") {
                Add-Warning "Spec '$moduleId' is done but ACCEPTANCE.md still contains evidence placeholders. Replace them with real command output, screenshots, logs, or 'not applicable'."
            }
            if ($acceptanceText -match "Manual QA" -and $acceptanceText -notmatch "\[x\]|\[X\]|無 UI 改動,不適用|無 UI 改動，不適用") {
                Add-Warning "Spec '$moduleId' Manual QA section looks empty. Mark applicable checks or write '無 UI 改動,不適用'."
            }
        }

        $roadmapLine = Get-RoadmapLine $roadmapText $moduleId
        if ($roadmapLine) {
            if ($roadmapLine.Contains($DoneMarker) -and (-not $isDone)) {
                Add-Issue "ROADMAP marks '$moduleId' done, but STATUS.md is not done. Sync ROADMAP / STATUS."
            }
            if ($isDone -and ($roadmapLine.Contains($TodoMarker) -or $roadmapLine.Contains($SpeccedMarker) -or $roadmapLine.Contains($ProgressMarker))) {
                Add-Issue "STATUS.md marks '$moduleId' done, but ROADMAP is not done. Sync ROADMAP / STATUS."
            }
        }

        if ($isDone -and ($nowText -match [regex]::Escape($moduleId))) {
            Add-Warning ".dev-os/NOW.md still points to done module '$moduleId'. Update NOW.md to the next task or waiting-for-design state."
        }
    }
    Add-Ok ".dev-os/specs was scanned."
}
else {
    Add-Warning ".dev-os/specs does not exist yet. This is fine before the first module."
}

Write-Host "devos doctor"
Write-Host "Root: $Root"
Write-Host ""

foreach ($item in $ok) {
    Write-Host "OK: $item"
}

if ($issues.Count -gt 0) {
    Write-Host ""
    Write-Host "Errors:"
    foreach ($issue in $issues) {
        Write-Host "  - $issue"
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "Warnings:"
    foreach ($warning in $warnings) {
        Write-Host "  - $warning"
    }
}

Write-Host ""
Write-Host "Summary: $($issues.Count) error(s), $($warnings.Count) warning(s), $($ok.Count) ok."

if ($issues.Count -gt 0) {
    exit 1
}

exit 0
