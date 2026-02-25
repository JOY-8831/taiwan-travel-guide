Add-Type -AssemblyName System.Drawing

$imgPath = "d:\JOB\nuxt-app\public\images"

$codes = @(
  'P-E---1','P-E---2','P-E---3','P-E---4',
  'P-C-a-N-1','P-C-a-N-2','P-C-a-N-3',
  'P-C-a-SE-1','P-C-a-SE-2','P-C-a-SE-3',
  'P-C-b-N-1','P-C-b-N-2','P-C-b-N-3','P-C-b-N-4','P-C-b-N-5','P-C-b-N-6','P-C-b-N-7','P-C-b-N-8',
  'P-C-b-SE-1','P-C-b-SE-2','P-C-b-SE-4',
  'P-C-d-N-1','P-C-d-N-2','P-C-d-SE-1',
  'P-M-a-N-2','P-M-a-N-3','P-M-a-N-4','P-M-a-N-5','P-M-a-N-6','P-M-a-N-7','P-M-a-N-8','P-M-a-N-9','P-M-a-N-10','P-M-a-N-11',
  'P-M-a-SE-1','P-M-a-SE-2','P-M-a-SE-3','P-M-a-SE-4','P-M-a-SE-5','P-M-a-SE-6',
  'P-M-b-N-1','P-M-b-N-2','P-M-b-N-3','P-M-b-N-4','P-M-b-N-5','P-M-b-N-6',
  'P-M-b-SE-1','P-M-b-SE-2','P-M-b-SE-4',
  'P-N-a-N-1','P-N-a-N-2','P-N-a-N-3','P-N-a-N-4','P-N-a-N-6',
  'P-N-a-SE-1','P-N-a-SE-3',
  'P-N-b-N-2','P-N-b-N-3',
  'P-R-a-N-1','P-R-a-N-2','P-R-a-N-3','P-R-a-N-4','P-R-a-N-5','P-R-a-N-7','P-R-a-N-8',
  'P-R-b-N-9','P-R-b-N-10',
  'P-R-a-SE-1','P-R-a-SE-2','P-R-a-SE-3'
)

function Get-BgColor($code) {
  if ($code -match '-N-') { return [System.Drawing.Color]::FromArgb(34, 120, 80) }    # Nature green
  if ($code -match '-M-') { return [System.Drawing.Color]::FromArgb(80, 80, 150) }    # Museum purple
  if ($code -match '-R-') { return [System.Drawing.Color]::FromArgb(170, 90, 110) }   # Relax rose
  if ($code -match '-C-') { return [System.Drawing.Color]::FromArgb(50, 120, 170) }   # City blue
  if ($code -match '-E-') { return [System.Drawing.Color]::FromArgb(180, 130, 50) }   # Experience amber
  return [System.Drawing.Color]::FromArgb(100, 100, 110)
}

$created = 0
$skipped = 0

foreach ($code in $codes) {
  $filePath = Join-Path $imgPath "$code.jpg"
  if (Test-Path $filePath) { $skipped++; continue }

  $bmp = New-Object System.Drawing.Bitmap 400, 300
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $bgColor = Get-BgColor $code
  $g.Clear($bgColor)

  # Darker overlay rectangle
  $overlayBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(60, 0, 0, 0))
  $g.FillRectangle($overlayBrush, 0, 220, 400, 80)
  $overlayBrush.Dispose()

  # Draw code label
  $font = New-Object System.Drawing.Font 'Consolas', 13, ([System.Drawing.FontStyle]::Bold)
  $whiteBrush = [System.Drawing.Brushes]::White
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 10, 230, 380, 60
  $g.DrawString($code, $font, $whiteBrush, $rect, $sf)

  # Draw "PLACEHOLDER" watermark
  $smallFont = New-Object System.Drawing.Font 'Arial', 10
  $grayBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(120, 255, 255, 255))
  $sfCenter = New-Object System.Drawing.StringFormat
  $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
  $sfCenter.LineAlignment = [System.Drawing.StringAlignment]::Center
  $centerRect = New-Object System.Drawing.RectangleF 0, 0, 400, 220
  $g.DrawString('PLACEHOLDER', $smallFont, $grayBrush, $centerRect, $sfCenter)
  $grayBrush.Dispose()

  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85L)
  $bmp.Save($filePath, $encoder, $encParams)

  $g.Dispose()
  $bmp.Dispose()
  $created++
}

Write-Host "Done: $created placeholder images created, $skipped already existed."
