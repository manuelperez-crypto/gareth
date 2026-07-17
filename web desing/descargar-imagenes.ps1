# Descarga las fotos del sitio a la carpeta images/ (correlo junto al HTML)
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path "images" | Out-Null
$map = @{
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" = "images/photo-1460925895917.jpg"
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=85" = "images/photo-1486406146926.jpg"
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80" = "images/photo-1507003211169.jpg"
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85" = "images/photo-1521791136064.jpg"
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=85" = "images/photo-1553877522.jpg"
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=900&q=80" = "images/photo-1554224154.jpg"
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80" = "images/photo-1554224155.jpg"
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1800&q=85" = "images/photo-1554469384.jpg"
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85" = "images/photo-1556761175.jpg"
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85" = "images/photo-1573496359142.jpg"
  "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=700&q=80" = "images/photo-1586282391129.jpg"
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80" = "images/photo-1589829545856.jpg"
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85" = "images/photo-1600880292203.jpg"
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80" = "images/photo-1611974789855.jpg"
}
foreach ($u in $map.Keys) {
  Write-Host "Descargando $($map[$u]) ..."
  Invoke-WebRequest -Uri $u -OutFile $map[$u]
}
Write-Host "Listo. Se descargaron $($map.Count) imagenes en images/"