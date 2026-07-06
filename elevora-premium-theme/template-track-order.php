<?php
/**
 * Template Name: Elevora Shipment Tracker
 */
get_header(); ?>

  <section style="padding: 60px 0; background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); margin-bottom: 60px;">
    <div class="container">
      <span style="color: var(--accent-dark); font-family: Outfit; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Shipment Status</span>
      <h1 style="font-size: 2.75rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 8px;">Track Package</h1>
    </div>
  </section>

  <main class="container" style="max-width: 600px; margin-bottom: 80px;">
    <div class="auth-card" style="max-width: 100%;" id="tracker-card-wrap">
      <form class="auth-form" onsubmit="event.preventDefault(); triggerTrackingSearch();">
        <div class="auth-input-group">
          <label>Order Reference Number</label>
          <input type="text" class="auth-input" id="tracking-id-input" required placeholder="ELV-94285-TY">
        </div>
        <button type="submit" class="auth-btn">Fetch Shipment Info</button>
      </form>
    </div>

    <!-- Output grid -->
    <div id="tracking-results-area" style="display: none; border: 1.5px solid var(--border-color); border-radius: var(--border-radius-lg); background-color: var(--bg-secondary); padding: 40px; margin-top: 40px;">
      <!-- Populated via script below -->
    </div>
  </main>

  <script>
    function triggerTrackingSearch() {
      const code = document.getElementById("tracking-id-input").value.trim().toUpperCase();
      const area = document.getElementById("tracking-results-area");

      if (!code) return;

      area.style.display = "block";
      area.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1.5px solid var(--border-color); padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h4 style="font-family: Outfit; font-size:1.1rem; font-weight:700;">Order: ${code}</h4>
            <span style="font-size:0.8rem; color:var(--text-muted);">Shipped via DHL Premium Route</span>
          </div>
          <span class="badge" style="background-color: var(--success); color:#fff; font-size:0.75rem; padding: 6px 12px; border-radius: var(--border-radius-full);">IN TRANSIT</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:30px; position:relative; padding-left: 30px;">
          <div style="position:absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background-color: var(--border-color);"></div>
          
          <!-- Node 1 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--accent); box-shadow: 0 0 10px var(--accent);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-primary);">Departed Sorting Hub</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Tech Hub facility - Jul 05, 2026</span>
          </div>

          <!-- Node 2 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--success);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-secondary);">Surge Safety Test Passed</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Quality Audit Chamber - Jul 04, 2026</span>
          </div>

          <!-- Node 3 -->
          <div style="position:relative;">
            <div style="position:absolute; left: -29px; top: 4px; width: 12px; height:12px; border-radius:50%; background-color: var(--success);"></div>
            <h5 style="font-family:Outfit; font-weight:700; font-size:0.95rem; color:var(--text-secondary);">Surface Magnet Alignment Checked</h5>
            <span style="font-size:0.8rem; color:var(--text-muted);">Assembly Line A - Jul 04, 2026</span>
          </div>
        </div>
      `;
      if (typeof showToast === "function") {
        showToast("Signal matched. Loading tracker loop", "info");
      }
    }
  </script>