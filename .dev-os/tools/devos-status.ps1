param(
    [string]$Root = (Get-Location).Path,
    [switch]$Json,
    [switch]$Watch,
    [switch]$NoColor,
    [int]$RefreshMs = 250
)

$ErrorActionPreference = "Stop"

# Ensure UTF-8 console output so emoji and Chinese render correctly.
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch {}

# --- ANSI / color helpers ---
$ESC = [char]27
$RESET = "${ESC}[0m"
$UseColor = -not $NoColor

$AnsiCode = @{
    Dim           = "${ESC}[2m"
    Bold          = "${ESC}[1m"
    Red           = "${ESC}[31m"
    Green         = "${ESC}[32m"
    Yellow        = "${ESC}[33m"
    Blue          = "${ESC}[34m"
    Magenta       = "${ESC}[35m"
    Cyan          = "${ESC}[36m"
    Grey          = "${ESC}[90m"
    BrightRed     = "${ESC}[91m"
    BrightGreen   = "${ESC}[92m"
    BrightYellow  = "${ESC}[93m"
    BrightBlue    = "${ESC}[94m"
    BrightMagenta = "${ESC}[95m"
    BrightCyan    = "${ESC}[96m"
    BrightWhite   = "${ESC}[97m"
}

function Color([string]$Text, [string]$Name) {
    if (-not $UseColor) { return $Text }
    $code = $AnsiCode[$Name]
    if (-not $code) { return $Text }
    return "$code$Text$RESET"
}

# --- File / parsing helpers (unchanged behavior) ---
function Read-Text([string]$Path) {
    if (Test-Path -LiteralPath $Path) {
        return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
    }
    return ""
}

function Strip-Quotes([string]$s) {
    if ($null -eq $s) { return "" }
    $t = $s.Trim()
    if ($t.Length -ge 2 -and $t.StartsWith('"') -and $t.EndsWith('"')) {
        return $t.Substring(1, $t.Length - 2)
    }
    return $t
}

function Get-Frontmatter([string]$Text) {
    $result = [ordered]@{}
    if (-not $Text) { return $result }

    $m = [regex]::Match($Text, "(?s)^---\s*\r?\n(.*?)\r?\n---\s*\r?\n")
    if (-not $m.Success) { return $result }

    $lines = $m.Groups[1].Value -split "\r?\n"
    $currentKey = $null
    $nested = $null
    $listMode = $false
    $listAcc = $null

    foreach ($line in $lines) {
        if ($line -match "^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$") {
            if ($listMode -and $currentKey) {
                $result[$currentKey] = $listAcc
                $listMode = $false
                $listAcc = $null
            }

            $key = $matches[1]
            $value = $matches[2].Trim()

            if ($value -eq "") {
                $currentKey = $key
                $nested = [ordered]@{}
                $result[$key] = $nested
                $listMode = $false
            }
            elseif ($value -eq "[]") {
                $result[$key] = @()
                $currentKey = $null
                $nested = $null
                $listMode = $false
            }
            else {
                $result[$key] = (Strip-Quotes $value)
                $currentKey = $null
                $nested = $null
                $listMode = $false
            }
        }
        elseif ($currentKey -and $line -match "^\s+-\s+(.+)$") {
            if (-not $listMode) {
                $listMode = $true
                $listAcc = New-Object System.Collections.Generic.List[string]
                $result[$currentKey] = $listAcc
            }
            $listAcc.Add((Strip-Quotes $matches[1])) | Out-Null
        }
        elseif ($currentKey -and -not $listMode -and $line -match "^\s+([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$") {
            $nested[$matches[1]] = (Strip-Quotes $matches[2])
        }
    }

    if ($listMode -and $currentKey) {
        $result[$currentKey] = $listAcc
    }

    return $result
}

function Format-RelativeTime([string]$IsoTime) {
    if (-not $IsoTime) { return "unknown" }
    if ($IsoTime -match "\[") { return "未填" }
    try {
        $dt = [datetimeoffset]::Parse($IsoTime).LocalDateTime
        $delta = (Get-Date) - $dt
        if ($delta.TotalSeconds -lt 60) { return "just now" }
        if ($delta.TotalMinutes -lt 60) { return "{0}m ago" -f [int]$delta.TotalMinutes }
        if ($delta.TotalHours -lt 24) { return "{0}h ago" -f [int]$delta.TotalHours }
        return "{0}d ago" -f [int]$delta.TotalDays
    }
    catch { return "unknown" }
}

function Get-FreshnessMinutes([string]$IsoTime) {
    if (-not $IsoTime -or $IsoTime -match "\[") { return -1 }
    try {
        $dt = [datetimeoffset]::Parse($IsoTime).LocalDateTime
        return ((Get-Date) - $dt).TotalMinutes
    }
    catch { return -1 }
}

function Split-PipeRow([string]$Line) {
    $cols = $Line -split "\|" | ForEach-Object { $_.Trim() }
    if ($cols.Length -gt 0 -and $cols[0] -eq "") { $cols = $cols[1..($cols.Length - 1)] }
    if ($cols.Length -gt 0 -and $cols[-1] -eq "") { $cols = $cols[0..($cols.Length - 2)] }
    return , $cols
}

function Test-SeparatorRow($Cols) {
    foreach ($c in $Cols) { if ($c -notmatch "^[-:]+$") { return $false } }
    return $Cols.Length -gt 0
}

function Classify-Status([string]$Cell) {
    $v = $Cell.ToLower().Trim()
    if ($v -match "✅|\bdone\b|\bcomplete\b") { return "done" }
    if ($v -match "🔨|\bin[- ]?progress\b") { return "in_progress" }
    if ($v -match "📝|\bspecc?ed\b|\bspeccing\b") { return "specced" }
    if ($v -match "🅿|\bparked\b") { return "parked" }
    if ($v -match "❌|\bdropped\b") { return "dropped" }
    if ($v -match "\bdeferred\b") { return "deferred" }
    if ($v -match "⬜|\bplanned\b") { return "planned" }
    return $null
}

function Classify-Kind([string]$Cell) {
    if ([string]::IsNullOrWhiteSpace($Cell)) { return $null }
    $v = $Cell.ToLower().Trim()
    if ($v -match "impl") { return "implementation" }
    if ($v -match "docs|doc-only|spec-only") { return "docs-only-spec" }
    if ($v -match "gov|decision|adr") { return "governance-decision" }
    return $null
}

function Get-PhaseProgress([string]$RoadmapText) {
    $phases = New-Object System.Collections.Generic.List[object]
    if (-not $RoadmapText) { return $phases }

    $regex = [regex]"(?ms)^#{2,3}\s+([^\r\n]+?)\s*\r?\n(.*?)(?=^#{2,3}\s|\z)"
    foreach ($m in $regex.Matches($RoadmapText)) {
        $name = $m.Groups[1].Value.Trim()
        $body = $m.Groups[2].Value

        if ($name -notmatch "Phase|全局支援") { continue }
        if ($name -match "完成度統計|寫作提示|當前焦點|狀態圖示|Status Legend|Current Phase|Completion Criteria|Deferred / Later|Notes") { continue }

        $counts = @{ done = 0; in_progress = 0; specced = 0; planned = 0; parked = 0; deferred = 0; dropped = 0 }
        $implDone = 0; $implTotal = 0
        $docsDone = 0; $docsTotal = 0
        $unclDone = 0; $unclTotal = 0
        $hasKind = $false

        $statusCol = -1
        $kindCol = -1
        $sawHeader = $false

        foreach ($line in ($body -split "\r?\n")) {
            if ($line -notmatch "^\s*\|") {
                $statusCol = -1
                $kindCol = -1
                $sawHeader = $false
                continue
            }

            $cols = Split-PipeRow $line
            if ($cols.Length -eq 0) { continue }
            if (Test-SeparatorRow $cols) { continue }

            if (-not $sawHeader) {
                $sawHeader = $true
                for ($i = 0; $i -lt $cols.Length; $i++) {
                    if ($cols[$i] -match "(?i)^status$|^狀態$") { $statusCol = $i }
                    elseif ($cols[$i] -match "(?i)^kind$|^type$|^種類$|^類型$") { $kindCol = $i }
                }
                if ($kindCol -ge 0) { $hasKind = $true }
                continue
            }

            if ($statusCol -lt 0 -or $statusCol -ge $cols.Length) { continue }
            # skip placeholder rows: a marker in ANY cell (ID/name/etc.), not just status
            $isPlaceholder = $false
            foreach ($c in $cols) { if ($c -match "\.\.\.|\[模組|\[填|\[name|\[module|\[模組ID\]") { $isPlaceholder = $true; break } }
            if ($isPlaceholder) { continue }
            $cell = $cols[$statusCol]
            if ([string]::IsNullOrWhiteSpace($cell)) { continue }
            $bucket = Classify-Status $cell
            if (-not $bucket) { continue }
            $counts[$bucket]++

            # kind-aware progress (deferred / dropped excluded from bars)
            if ($bucket -eq "deferred" -or $bucket -eq "dropped") { continue }
            $kind = $null
            if ($kindCol -ge 0 -and $kindCol -lt $cols.Length) { $kind = Classify-Kind $cols[$kindCol] }

            if ($kind -eq "implementation") {
                $implTotal++
                if ($bucket -eq "done") { $implDone++ }
            }
            elseif ($kind -eq "docs-only-spec" -or $kind -eq "governance-decision") {
                # a docs-only module is "complete" once its SPEC is accepted (specced) or done
                $docsTotal++
                if ($bucket -eq "done" -or $bucket -eq "specced") { $docsDone++ }
            }
            else {
                $unclTotal++
                if ($bucket -eq "done") { $unclDone++ }
            }
        }

        $total = $counts.done + $counts.in_progress + $counts.specced + $counts.planned + $counts.parked
        if ($total -le 0) { continue }

        $phases.Add([pscustomobject]@{
                name        = $name
                done        = $counts.done
                in_progress = $counts.in_progress
                specced     = $counts.specced
                planned     = $counts.planned
                parked      = $counts.parked
                deferred    = $counts.deferred
                dropped     = $counts.dropped
                total       = $total
                has_kind    = $hasKind
                impl_done   = $implDone
                impl_total  = $implTotal
                docs_done   = $docsDone
                docs_total  = $docsTotal
                uncl_done   = $unclDone
                uncl_total  = $unclTotal
            }) | Out-Null
    }
    return $phases
}

function Get-VisionStages([string]$VisionText) {
    # Parses the VISION.md "Stage Map" table (columns: Stage | Short | Name | Status | ...).
    # Placeholder rows (Short starts with "[") and non-numeric Stage rows are skipped,
    # so a freshly-copied template skeleton yields an empty list (breadcrumb stays hidden).
    $stages = New-Object System.Collections.Generic.List[object]
    if (-not $VisionText) { return $stages }
    $stageCol = -1; $shortCol = -1; $nameCol = -1; $statusCol = -1; $sawHeader = $false
    foreach ($line in ($VisionText -split "\r?\n")) {
        if ($line -notmatch "^\s*\|") {
            $stageCol = -1; $shortCol = -1; $nameCol = -1; $statusCol = -1; $sawHeader = $false
            continue
        }
        $cols = Split-PipeRow $line
        if ($cols.Length -eq 0) { continue }
        if (Test-SeparatorRow $cols) { continue }
        if (-not $sawHeader) {
            for ($i = 0; $i -lt $cols.Length; $i++) {
                if ($cols[$i] -match "(?i)^stage$") { $stageCol = $i }
                elseif ($cols[$i] -match "(?i)^short$") { $shortCol = $i }
                elseif ($cols[$i] -match "(?i)^name$") { $nameCol = $i }
                elseif ($cols[$i] -match "(?i)^status$") { $statusCol = $i }
            }
            if ($stageCol -ge 0 -and $shortCol -ge 0) { $sawHeader = $true }
            else { $stageCol = -1; $shortCol = -1; $nameCol = -1; $statusCol = -1 }
            continue
        }
        if ($stageCol -ge $cols.Length) { continue }
        $num = $cols[$stageCol].Trim()
        if ($num -notmatch "^\d+$") { continue }
        $short = if ($shortCol -ge 0 -and $shortCol -lt $cols.Length) { $cols[$shortCol].Trim() } else { "" }
        if ($short -match "^\[") { continue }
        $name = if ($nameCol -ge 0 -and $nameCol -lt $cols.Length) { $cols[$nameCol].Trim() } else { "" }
        $status = if ($statusCol -ge 0 -and $statusCol -lt $cols.Length) { $cols[$statusCol].Trim() } else { "" }
        $stages.Add([pscustomobject]@{ num = $num; short = $short; name = $name; status = $status }) | Out-Null
    }
    return $stages
}

function Format-ProgressBar([int]$Done, [int]$Total, [int]$Width = 12) {
    if ($Total -le 0) { return ([string][char]0x2591) * $Width }
    $filled = [int][math]::Floor($Done * $Width / $Total)
    if ($filled -gt $Width) { $filled = $Width }
    $empty = $Width - $filled
    return (([string][char]0x2588) * $filled) + (([string][char]0x2591) * $empty)
}

function Is-Placeholder([string]$Value) {
    if ([string]::IsNullOrWhiteSpace($Value)) { return $true }
    return $Value -match "^\[.*\]$"
}

function Get-RecentCommits([string]$RepoRoot, [int]$Count = 5) {
    $list = New-Object System.Collections.Generic.List[object]
    $git = Join-Path $RepoRoot ".git"
    if (-not (Test-Path -LiteralPath $git)) { return $list }
    try {
        Push-Location $RepoRoot
        $log = git log --no-merges --pretty=format:"%h|%s|%ar" -n $Count 2>$null
        Pop-Location
        if ($log) {
            foreach ($line in ($log -split "\r?\n")) {
                if (-not $line) { continue }
                $parts = $line -split "\|", 3
                if ($parts.Length -eq 3) {
                    $list.Add([pscustomobject]@{ sha = $parts[0]; subject = $parts[1]; rel = $parts[2] }) | Out-Null
                }
            }
        }
    }
    catch { Pop-Location -ErrorAction SilentlyContinue }
    return $list
}

# --- Color choice helpers ---
function Get-StateColor([string]$WorkflowState) {
    # SX codes: S0/S8/S9 are terminal/done-ish; S2/S3/S5/S6 are active; rest neutral.
    switch -Regex ($WorkflowState) {
        '^S(8|9)$'           { return 'BrightGreen' }
        '^S(2|3|5|6)$'       { return 'BrightYellow' }
        '^S0$'               { return 'Cyan' }
        default              { return 'BrightWhite' }
    }
}

function Get-FreshnessColor([double]$Minutes) {
    if ($Minutes -lt 0) { return 'Grey' }
    if ($Minutes -lt 5) { return 'BrightGreen' }
    if ($Minutes -lt 60) { return 'BrightYellow' }
    return 'Grey'
}

function Get-VerdictColor([string]$Verdict) {
    switch -Regex ($Verdict) {
        '(?i)healthy'         { return 'BrightGreen' }
        '(?i)should switch'   { return 'BrightRed' }
        '(?i)watch|caution'   { return 'BrightYellow' }
        default               { return 'BrightWhite' }
    }
}

function Get-ActivityGlyph([double]$Minutes, [char]$SpinnerChar) {
    if ($Minutes -lt 0) { return [pscustomobject]@{ char = '?'; color = 'Grey' } }
    if ($Minutes -lt 5) { return [pscustomobject]@{ char = $SpinnerChar; color = 'BrightGreen' } }
    if ($Minutes -lt 60) { return [pscustomobject]@{ char = [char]0x25CF; color = 'BrightYellow' } }  # ●
    return [pscustomobject]@{ char = [char]0x25CB; color = 'Grey' }                                    # ○
}

# --- Renderer (returns array of pre-colored lines) ---
function Render-Lines {
    param(
        $State,
        $Phases,
        $RecentCommits,
        [bool]$Uninitialized,
        [string]$Root,
        [char]$SpinnerChar,
        [bool]$ShowClock = $false,
        $VisionStages = @()
    )

    $lines = New-Object System.Collections.Generic.List[string]

    # Header
    $hdr = (Color 'devos status' 'BrightCyan')
    if ($ShowClock) {
        $hdr += "  " + (Color (Get-Date -Format 'HH:mm:ss') 'Grey')
    }
    $lines.Add($hdr) | Out-Null
    $lines.Add((Color "Root: $Root" 'Dim')) | Out-Null
    $lines.Add('') | Out-Null

    # --- Vision breadcrumb (product north-star stage map; hidden when no VISION.md) ---
    $visionDict = $null
    if ($State -and $State['vision'] -is [System.Collections.IDictionary]) { $visionDict = $State['vision'] }
    $curStage = if ($visionDict) { [string]$visionDict['stage'] } else { "" }
    if ($curStage -match '^\[') { $curStage = "" }  # unfilled placeholder -> treat as unset

    if ($VisionStages -and $VisionStages.Count -gt 0) {
        $segs = New-Object System.Collections.Generic.List[string]
        foreach ($s in $VisionStages) {
            $seg = "{0} {1}" -f $s.num, $s.short
            if ($s.num -eq $curStage) { $segs.Add((Color $seg 'BrightGreen')) | Out-Null }
            elseif ($s.status -match '(?i)done') { $segs.Add((Color $seg 'Green')) | Out-Null }
            elseif ($s.status -match '(?i)defer') { $segs.Add((Color $seg 'Grey')) | Out-Null }
            else { $segs.Add((Color $seg 'Dim')) | Out-Null }
        }
        $crumb = ($segs -join (Color ' › ' 'Grey'))
        $lines.Add(("{0} : {1}" -f (Color ("{0,-8}" -f 'Vision') 'Dim'), $crumb)) | Out-Null
        $curName = ""
        foreach ($s in $VisionStages) { if ($s.num -eq $curStage) { $curName = $s.name; break } }
        if ($curStage) {
            $sub = "stage {0}/{1}" -f $curStage, $VisionStages.Count
            if ($curName) { $sub += " — $curName" }
            $lines.Add(("           {0}" -f (Color $sub 'Dim'))) | Out-Null
        }
        $lines.Add('') | Out-Null
    }
    elseif ($visionDict -and $curStage) {
        $txt = "stage $curStage"
        if ($visionDict['total_stages']) { $txt += "/$($visionDict['total_stages'])" }
        if ($visionDict['stage_name'] -and $visionDict['stage_name'] -notmatch '^\[') { $txt += " — $($visionDict['stage_name'])" }
        $lines.Add(("{0} : {1}" -f (Color ("{0,-8}" -f 'Vision') 'Dim'), (Color $txt 'BrightGreen'))) | Out-Null
        $lines.Add('') | Out-Null
    }

    if ($Uninitialized) {
        $lines.Add((Color 'STATE.md 尚未初始化(只剩 placeholder 或缺檔)。' 'BrightYellow')) | Out-Null
        $lines.Add((Color 'AI 在第一個 step 結尾會覆寫 STATE.md。' 'Dim')) | Out-Null
    }
    else {
        $freshMin = Get-FreshnessMinutes $State['last_update']
        $glyph = Get-ActivityGlyph $freshMin $SpinnerChar

        $label = { param($t) Color ("{0,-8}" -f $t) 'Dim' }

        $lines.Add(("{0} : {1}" -f (& $label 'Phase'), (Color $State['phase'] 'BrightYellow'))) | Out-Null
        $lines.Add(("{0} : {1}" -f (& $label 'Wave'), $State['wave'])) | Out-Null

        $moduleLine = ("{0} — {1}" -f $State['module'], $State['module_name']).Trim(" —".ToCharArray())
        $lines.Add(("{0} : {1}" -f (& $label 'Module'), (Color $moduleLine 'BrightCyan'))) | Out-Null

        $stateLine = ("{0} — {1}" -f $State['workflow_state'], $State['workflow_state_name']).Trim(" —".ToCharArray())
        $stateColored = Color $stateLine (Get-StateColor $State['workflow_state'])
        $glyphColored = Color ([string]$glyph.char) $glyph.color
        $lines.Add(("{0} : {1}  {2}" -f (& $label 'State'), $stateColored, $glyphColored)) | Out-Null

        $lines.Add(("{0} : {1}" -f (& $label 'Branch'), (Color $State['branch'] 'Magenta'))) | Out-Null

        $rel = Format-RelativeTime $State['last_update']
        $relCol = Get-FreshnessColor $freshMin
        $lines.Add(("{0} : {1} {2}" -f (& $label 'Updated'), (Color $State['last_update'] 'Dim'), (Color "($rel)" $relCol))) | Out-Null

        $lines.Add('') | Out-Null

        if ($State['current_step'] -is [System.Collections.IDictionary]) {
            $cs = $State['current_step']
            $stepNo = Color ("#{0}" -f $cs['n']) 'BrightWhite'
            $lines.Add(("{0} : {1} {2}" -f (& $label 'Current'), $stepNo, $cs['title'])) | Out-Null
            if ($cs['location']) {
                $lines.Add(("           {0} {1}" -f (Color '@' 'Dim'), (Color $cs['location'] 'Grey'))) | Out-Null
            }
        }
        if ($State['last_step'] -is [System.Collections.IDictionary]) {
            $ls = $State['last_step']
            $stepNo = Color ("#{0}" -f $ls['n']) 'Grey'
            $line = "{0} {1}" -f $stepNo, $ls['title']
            if ($ls['commit'] -and $ls['commit'] -ne '(none)') {
                $line += " " + (Color ("({0})" -f $ls['commit']) 'Magenta')
            }
            $lines.Add(("{0} : {1}" -f (& $label 'Last'), $line)) | Out-Null
        }
        if ($State['next_step'] -is [System.Collections.IDictionary]) {
            $ns = $State['next_step']
            $stepNo = Color ("#{0}" -f $ns['n']) 'Dim'
            $lines.Add(("{0} : {1} {2}" -f (& $label 'Next'), $stepNo, (Color $ns['title'] 'Cyan'))) | Out-Null
        }

        $blockers = $State['blockers']
        $blockerCount = if ($null -eq $blockers) { 0 } elseif ($blockers -is [array]) { $blockers.Count } else { @($blockers).Count }
        if ($blockerCount -eq 0) {
            $lines.Add(("{0} : {1}" -f (& $label 'Blockers'), (Color 'none' 'Dim'))) | Out-Null
        }
        else {
            $lines.Add(("{0} : {1}" -f (& $label 'Blockers'), (Color ("{0} active" -f $blockerCount) 'BrightYellow'))) | Out-Null
            foreach ($b in $blockers) {
                $lines.Add(("  {0} {1}" -f (Color '-' 'Yellow'), (Color $b 'Yellow'))) | Out-Null
            }
        }

        if ($State['conversation'] -is [System.Collections.IDictionary]) {
            $c = $State['conversation']
            $verdictCol = Get-VerdictColor $c['health_verdict']
            $thread = "#{0}, {1} messages, {2}" -f $c['thread_n'], $c['messages_estimate'], (Color $c['health_verdict'] $verdictCol)
            $lines.Add(("{0} : {1}" -f (& $label 'Thread'), $thread)) | Out-Null
        }
    }

    $lines.Add('') | Out-Null

    if ($Phases -and $Phases.Count -gt 0) {
        $lines.Add((Color 'ROADMAP progress:' 'BrightCyan')) | Out-Null

        # legacy (no Kind column) phases keep aligned single bars
        $legacy = @($Phases | Where-Object { -not $_.has_kind })
        $nameWidth = if ($legacy.Count -gt 0) { ($legacy | ForEach-Object { $_.name.Length } | Measure-Object -Maximum).Maximum } else { 20 }
        if ($nameWidth -lt 20) { $nameWidth = 20 }

        foreach ($p in $Phases) {
            if ($p.has_kind) {
                # composition: makes "5 docs vs 1 impl" imbalance visible
                $comp = New-Object System.Collections.Generic.List[string]
                if ($p.impl_total -gt 0) { [void]$comp.Add(("{0} impl" -f $p.impl_total)) }
                if ($p.docs_total -gt 0) { [void]$comp.Add(("{0} docs" -f $p.docs_total)) }
                if ($p.uncl_total -gt 0) { [void]$comp.Add(("{0} unclassified" -f $p.uncl_total)) }
                if ($p.deferred -gt 0) { [void]$comp.Add(("{0} deferred" -f $p.deferred)) }
                $compStr = if ($comp.Count -gt 0) { "  " + (Color ("(" + ($comp -join " · ") + ")") 'Dim') } else { "" }
                $lines.Add(("  {0}{1}" -f (Color $p.name 'BrightWhite'), $compStr)) | Out-Null

                if ($p.impl_total -gt 0) {
                    $bar = Format-ProgressBar $p.impl_done $p.impl_total 12
                    $pct = [int][math]::Round($p.impl_done * 100 / $p.impl_total)
                    $col = if ($pct -ge 100) { 'BrightGreen' } elseif ($pct -ge 50) { 'BrightYellow' } elseif ($pct -gt 0) { 'Cyan' } else { 'Grey' }
                    $lines.Add(("      {0}  {1}  {2}" -f (Color 'Impl' 'BrightCyan'), (Color $bar $col), (Color ("{0}/{1} ({2}%)" -f $p.impl_done, $p.impl_total, $pct) $col))) | Out-Null
                }
                if ($p.docs_total -gt 0) {
                    $bar = Format-ProgressBar $p.docs_done $p.docs_total 12
                    $pct = [int][math]::Round($p.docs_done * 100 / $p.docs_total)
                    $col = if ($pct -ge 100) { 'Green' } elseif ($pct -ge 50) { 'Yellow' } else { 'Grey' }
                    $lines.Add(("      {0}  {1}  {2}" -f (Color 'Docs' 'Blue'), (Color $bar $col), (Color ("{0}/{1} ({2}%)" -f $p.docs_done, $p.docs_total, $pct) $col))) | Out-Null
                }
                if ($p.uncl_total -gt 0) {
                    $bar = Format-ProgressBar $p.uncl_done $p.uncl_total 12
                    $pct = [int][math]::Round($p.uncl_done * 100 / $p.uncl_total)
                    $lines.Add(("      {0}  {1}  {2}" -f (Color '?   ' 'Grey'), (Color $bar 'Grey'), (Color ("{0}/{1} ({2}%) unclassified — add Kind column" -f $p.uncl_done, $p.uncl_total, $pct) 'Grey'))) | Out-Null
                }
            }
            else {
                $bar = Format-ProgressBar $p.done $p.total 12
                $pct = if ($p.total -gt 0) { [int][math]::Round($p.done * 100 / $p.total) } else { 0 }
                $barColor = if ($pct -ge 100) { 'BrightGreen' } elseif ($pct -ge 50) { 'BrightYellow' } elseif ($pct -gt 0) { 'Cyan' } else { 'Grey' }
                $extras = New-Object System.Collections.Generic.List[string]
                if ($p.in_progress -gt 0) { [void]$extras.Add(("{0} in-progress" -f $p.in_progress)) }
                if ($p.specced -gt 0) { [void]$extras.Add(("{0} specced" -f $p.specced)) }
                if ($p.parked -gt 0) { [void]$extras.Add(("{0} parked" -f $p.parked)) }
                if ($p.deferred -gt 0) { [void]$extras.Add(("{0} deferred" -f $p.deferred)) }
                $extraStr = if ($extras.Count -gt 0) { '  ' + (Color ("[" + ($extras -join ', ') + "]") 'Dim') } else { '' }

                $namePadded = "{0,-$nameWidth}" -f $p.name
                $progress = "{0}/{1}  ({2}%)" -f $p.done, $p.total, $pct
                $lines.Add(("  {0}  {1}  {2}{3}" -f $namePadded, (Color $bar $barColor), (Color $progress $barColor), $extraStr)) | Out-Null
            }
        }
    }
    else {
        $lines.Add((Color 'ROADMAP progress: (尚未填入模組,或全部還是 placeholder)' 'Dim')) | Out-Null
    }

    if ($RecentCommits -and $RecentCommits.Count -gt 0) {
        $lines.Add('') | Out-Null
        $lines.Add((Color 'Recent commits:' 'BrightCyan')) | Out-Null
        foreach ($c in $RecentCommits) {
            $line = "  {0}  {1}  {2}" -f (Color $c.sha 'Magenta'), $c.subject, (Color ("(" + $c.rel + ")") 'Dim')
            $lines.Add($line) | Out-Null
        }
    }

    return $lines
}

# --- Main ---
$devOsRoot = Join-Path $Root ".dev-os"
if (-not (Test-Path -LiteralPath $devOsRoot)) {
    if ($Json) {
        @{ ok = $false; error = "no_dev_os_dir"; root = $Root } | ConvertTo-Json -Depth 5
    }
    else {
        Write-Host (Color 'devos status' 'BrightCyan')
        Write-Host (Color "Root: $Root" 'Dim')
        Write-Host ''
        Write-Host (Color '找不到 .dev-os/ — 先在此 root 跑 devos init 或從 template/ 複製。' 'BrightYellow')
    }
    exit 1
}

$statePath = Join-Path $devOsRoot "STATE.md"
$roadmapPath = Join-Path $devOsRoot "ROADMAP.md"
$visionPath = Join-Path $devOsRoot "VISION.md"

# --- JSON branch (no colors, no animation) ---
if ($Json) {
    $stateText = Read-Text $statePath
    $roadmapText = Read-Text $roadmapPath
    $visionText = Read-Text $visionPath
    $state = Get-Frontmatter $stateText
    $phases = Get-PhaseProgress $roadmapText
    $visionStages = Get-VisionStages $visionText
    $uninit = (-not $stateText) -or ($state.Count -eq 0) -or (Is-Placeholder $state["phase"])
    $recent = Get-RecentCommits $Root

    [ordered]@{
        ok             = $true
        root           = $Root
        uninitialized  = [bool]$uninit
        state          = $state
        phases         = @($phases)
        vision_stages  = @($visionStages)
        recent_commits = @($recent)
        generated_at   = (Get-Date).ToString("o")
    } | ConvertTo-Json -Depth 8
    exit 0
}

# --- Watch branch (live TUI) ---
if ($Watch) {
    $spinnerFrames = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'.ToCharArray()
    $spinIdx = 0
    $tick = 0
    $stateMtime = $null
    $roadmapMtime = $null
    $visionMtime = $null
    $state = [ordered]@{}
    $phases = @()
    $visionStages = @()
    $recent = @()

    # Enter alt screen + hide cursor
    Write-Host ("${ESC}[?1049h${ESC}[?25l${ESC}[2J${ESC}[H") -NoNewline

    try {
        while ($true) {
            $sm = if (Test-Path -LiteralPath $statePath) { (Get-Item -LiteralPath $statePath).LastWriteTimeUtc.Ticks } else { 0 }
            $rm = if (Test-Path -LiteralPath $roadmapPath) { (Get-Item -LiteralPath $roadmapPath).LastWriteTimeUtc.Ticks } else { 0 }
            $vm = if (Test-Path -LiteralPath $visionPath) { (Get-Item -LiteralPath $visionPath).LastWriteTimeUtc.Ticks } else { 0 }

            if ($sm -ne $stateMtime) {
                try { $state = Get-Frontmatter (Read-Text $statePath) } catch { }
                $stateMtime = $sm
            }
            if ($rm -ne $roadmapMtime) {
                try { $phases = Get-PhaseProgress (Read-Text $roadmapPath) } catch { }
                $roadmapMtime = $rm
            }
            if ($vm -ne $visionMtime) {
                try { $visionStages = Get-VisionStages (Read-Text $visionPath) } catch { }
                $visionMtime = $vm
            }
            if ($tick % 8 -eq 0) {
                try { $recent = Get-RecentCommits $Root } catch { }
            }

            $uninit = (-not $state) -or ($state.Count -eq 0) -or (Is-Placeholder $state['phase'])
            $bodyLines = @(Render-Lines -State $state -Phases $phases -RecentCommits $recent -Uninitialized $uninit -Root $Root -SpinnerChar $spinnerFrames[$spinIdx] -ShowClock $true -VisionStages $visionStages)

            $footer = "{0}  {1}  refresh {2}ms" -f (Color 'Ctrl+C to exit' 'Dim'), (Color '|' 'Grey'), $RefreshMs
            $allLines = $bodyLines + @('', $footer)

            $sb = New-Object System.Text.StringBuilder
            [void]$sb.Append("${ESC}[H")
            foreach ($line in $allLines) {
                [void]$sb.Append($line)
                [void]$sb.Append("${ESC}[K`n")
            }
            [void]$sb.Append("${ESC}[J")
            Write-Host $sb.ToString() -NoNewline

            $spinIdx = ($spinIdx + 1) % $spinnerFrames.Length
            $tick++
            Start-Sleep -Milliseconds $RefreshMs
        }
    }
    finally {
        # Restore terminal: show cursor + exit alt screen
        Write-Host ("${ESC}[?25h${ESC}[?1049l") -NoNewline
    }
    exit 0
}

# --- Static branch ---
$stateText = Read-Text $statePath
$roadmapText = Read-Text $roadmapPath
$visionText = Read-Text $visionPath
$state = Get-Frontmatter $stateText
$phases = Get-PhaseProgress $roadmapText
$visionStages = Get-VisionStages $visionText
$uninit = (-not $stateText) -or ($state.Count -eq 0) -or (Is-Placeholder $state["phase"])
$recent = Get-RecentCommits $Root

# In static mode, spinner is shown as a static dot (no animation).
$lines = Render-Lines -State $state -Phases $phases -RecentCommits $recent -Uninitialized $uninit -Root $Root -SpinnerChar ([char]0x25CF) -ShowClock $false -VisionStages $visionStages
foreach ($line in $lines) { Write-Host $line }
exit 0
