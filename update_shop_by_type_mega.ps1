$files = Get-ChildItem -Path $PSScriptRoot -Filter *.html

$newShopByTypeItem = '          <li class="nav-item">
            <a href="shop.html" class="nav-link">Shop By Type</a>
            <!-- Mega Menu Dropdown -->
            <div class="mega-menu shop-by-type-mega">
              <!-- Left Spotlight Side -->
              <div class="mega-spotlight">
                <div class="spotlight-image-container">
                  <img src="assets/images/body_mist.jpg" alt="PLAY Body Mist Spotlight">
                </div>
                <div class="spotlight-content">
                  <a href="product.html?id=body_mist" class="spotlight-title-link">
                    <span>Reapply with PLAY Body Mist SPF 50</span>
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>

              <!-- Right Grid Side -->
              <div class="mega-grid-side">
                <div class="mega-menu-header">
                  <h3>Shop By Type</h3>
                </div>
                
                <div class="type-grid">
                  <!-- Column 1 -->
                  <div class="category-col">
                    <a href="shop.html?type=Lotion" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/play_lotion.jpg" alt="Lotion & Moisturizer">
                        </div>
                        <span class="category-card-title">Lotion & Moisturizer</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                    <a href="shop.html?type=Stick" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/glowscreen.jpg" alt="Stick">
                        </div>
                        <span class="category-card-title">Stick</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                    <a href="shop.html?type=Lip" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/unseen_sunscreen.jpg" alt="Lip">
                        </div>
                        <span class="category-card-title">Lip</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                  </div>

                  <!-- Column 2 -->
                  <div class="category-col">
                    <a href="shop.html?type=Spray" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/body_mist.jpg" alt="Spray">
                        </div>
                        <span class="category-card-title">Spray</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                    <a href="shop.html?type=Serum" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/glowscreen.jpg" alt="Oil & Serum">
                        </div>
                        <span class="category-card-title">Oil & Serum</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                    <a href="shop.html?formulation=Mineral" class="category-card-link">
                      <div class="category-card">
                        <div class="category-card-img">
                          <img src="assets/images/unseen_sunscreen.jpg" alt="Mineral">
                        </div>
                        <span class="category-card-title">Mineral</span>
                        <div class="category-card-btn">
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="mega-menu-footer">
                  <a href="shop.html" class="mega-menu-footer-link">Shop All Shop By Type</a>
                </div>
              </div>
            </div>
          </li>'

$target = '<li class="nav-item"><a href="shop.html" class="nav-link">Shop By Type</a></li>'

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content.Contains($target)) {
        $content = $content.Replace($target, $newShopByTypeItem)
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Replaced Shop By Type link in: $($file.Name)"
    } else {
        Write-Warning "Could not find Shop By Type target in: $($file.Name)"
    }
}

Write-Host "Shop By Type mega menu updates completed!"
