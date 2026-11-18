$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
$dl = [ordered]@{
  'kerberos.svg'        = 'https://commons.wikimedia.org/wiki/Special:FilePath/Kerberos.svg'
  'raid-1.png'          = 'https://commons.wikimedia.org/wiki/Special:FilePath/RAID%201.png'
  'raid-5.png'          = 'https://commons.wikimedia.org/wiki/Special:FilePath/RAID%205.png'
  'raid-10.png'         = 'https://commons.wikimedia.org/wiki/Special:FilePath/RAID%2010.png'
  'cloud-computing.png' = 'https://commons.wikimedia.org/wiki/Special:FilePath/Sch%C3%A9ma-Cloud-Computing.png'
}
Set-Location "C:\Users\Léo\Documents\Dev\Site-Cours IT"
foreach($k in $dl.Keys){
  $ok = $false
  for($t=0; $t -lt 5 -and -not $ok; $t++){
    Start-Sleep -Seconds 50
    try {
      Invoke-WebRequest -Uri $dl[$k] -OutFile "Images\$k" -UserAgent $ua -TimeoutSec 40
      if((Get-Item "Images\$k").Length -gt 3000){ $ok = $true }
    } catch { }
  }
  "$k : $(if($ok){'OK ' + [math]::Round((Get-Item "Images\$k").Length/1KB).ToString() + ' Ko'} else {'ECHEC'})" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations.log"
}
"TERMINE" | Out-File -Append -Encoding utf8 "$env:TEMP\opencode\dl-illustrations.log"