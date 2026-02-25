$artifactDir = 'C:\Users\TY Liu\.gemini\antigravity\brain\58f2ac73-ec81-4cec-bf93-a610b3a03a91'
$imgDir = 'd:\JOB\nuxt-app\public\images'

# Use the latest generated version of each
$mappings = @(
  [pscustomobject]@{ src = 'p_n_b_n_3_1771500286534.png'; dest = 'P-N-b-N-3.jpg' },
  [pscustomobject]@{ src = 'p_r_a_n_2_1771500498497.png'; dest = 'P-R-a-N-2.jpg' },
  [pscustomobject]@{ src = 'p_m_a_n_5_1771500112875.png'; dest = 'P-M-a-N-5.jpg' }
)

foreach ($m in $mappings) {
  $src = Join-Path $artifactDir $m.src
  $dst = Join-Path $imgDir $m.dest
  Copy-Item $src $dst -Force
  Write-Host "Copied: $($m.dest)"
}
Write-Host "Done!"
