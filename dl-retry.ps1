# Rejoue les telechargements en echec avec pauses longues (rate-limit Wikimedia)
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
$root = 'C:\Users\' + [char]0x004C + [char]0x00E9 + 'o\Documents\Dev\Site-Cours IT'
Set-Location $root
$dl = [ordered]@{
  'kerberos.svg'        = 'https://commons.wikimedia.org/wiki/Special:FilePath/Kerberos.svg'
  'raid-10.png'         = 'https://commons.wikimedia.org/wiki/Special:FilePath/RAID%2010.png'
  'cloud-computing.png' = 'https://commons.wikimedia.org/wiki/Special:FilePath/Sch%C3%A9ma-Cloud-Computing.png'
}
foreach($k in $dl.Keys){
  $ok = $false
  for($t=0; $t -lt 4 -and -not $ok; $t++){
    Start-Sleep -Seconds 75
    try {
      Invoke-WebRequest -Uri $dl[$k] -OutFile "Images\$k" -UserAgent $ua -TimeoutSec 40
      if((Get-Item "Images\$k").Length -gt 3000){ $ok = $true }
    } catch { }
  }
  "$k : $(if($ok){'OK ' + [math]::Round((Get-Item "Images\$k").Length/1KB).ToString() + ' Ko'} else {'ECHEC'})" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations-2.log"
}
"TERMINE" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations-2.log"