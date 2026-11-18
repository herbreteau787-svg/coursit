# Retry final via PowerShell (les 429s sont intermittents — raid-1/5 ont reussi ainsi)
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
$root = 'C:\Users\' + [char]0x004C + [char]0x00E9 + 'o\Documents\Dev\Site-Cours IT'
Set-Location $root
$dl = [ordered]@{
  'dhcp-client-state.svg' = 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhcp-client-state-diagram.svg'
  'cloud-computing-types.svg' = 'https://commons.wikimedia.org/wiki/Special:FilePath/Cloud%20computing%20types.svg'
  'wireshark-3.6.png' = 'https://commons.wikimedia.org/wiki/Special:FilePath/Wireshark%203.6%20screenshot.png'
}
foreach($k in $dl.Keys){
  $ok = $false
  for($t=0; $t -lt 6 -and -not $ok; $t++){
    Start-Sleep -Seconds 55
    try {
      Invoke-WebRequest -Uri $dl[$k] -OutFile "Images\$k" -UserAgent $ua -TimeoutSec 40
      if((Get-Item "Images\$k").Length -gt 3000){ $ok = $true }
    } catch { }
  }
  "$k : $(if($ok){'OK ' + [math]::Round((Get-Item "Images\$k").Length/1KB).ToString() + ' Ko'} else {'ECHEC'})" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations-4.log"
}
"TERMINE" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations-4.log"