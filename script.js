const fleetData = [
  "Atlas Compact",
  "Sahara Pulse",
  "Casablanca City",
  "Marrakech Glide",
  "Rabat Classic",
  "Tangier Flow",
  "Essaouira Breeze",
  "Agadir Sun",
  "Oasis Cross",
  "Medina Move",
  "Atlas Trail",
  "Majorelle Line",
  "Dune Rider",
  "Bourgogne Shift",
  "Corniche Drive",
  "Oceanic Sport",
  "Desert Whisper",
  "Zenith Touring",
  "Luxe Avenue",
  "Citronelle Urban",
  "Royal Crescent",
  "Nova Coast",
  "Platinum Route",
  "Amber City",
  "Velvet Road",
  "Blue Kasbah",
  "Argan Cruiser",
  "Palm Line",
  "Riviera Edge",
  "Casa Elite",
  "Atlas Prime",
  "Mirage Select",
  "Fusion Lane",
  "Dynamic Plus",
  "Sapphire Ride",
  "Urban Pulse",
  "Grand Touring",
  "Peak Drive",
  "Nova Luxe",
  "Signature S"
];

const carTypes = ["Compacte", "SUV", "Berline", "Premium"];
const transmissions = ["Auto", "Manuel"];
const fuels = ["Essence", "Diesel", "Hybride"];

const fleetGrid = document.getElementById("fleetGrid");
const searchInput = document.getElementById("fleetSearch");
const chips = document.querySelectorAll(".chip");

const cars = fleetData.map((name, index) => {
  const type = carTypes[index % carTypes.length];
  const transmission = transmissions[(index + 1) % transmissions.length];
  const fuel = fuels[index % fuels.length];
  const base = 220 + (index % 7) * 35;
  const price = base + Math.floor(Math.random() * 35);
  return {
    id: index,
    name,
    type,
    transmission,
    fuel,
    price
  };
});

let activeFilter = "all";

const renderFleet = () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = cars.filter((car) => {
    const matchesType = activeFilter === "all" || car.type === activeFilter;
    const matchesQuery = car.name.toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  fleetGrid.innerHTML = filtered
    .map((car) => {
      return `
        <article class="car-card reveal" data-type="${car.type}">
          <div class="car-head">
            <div>
              <p class="car-type">${car.type}</p>
              <h3>${car.name}</h3>
            </div>
            <span class="badge">Disponible</span>
          </div>
          <div class="car-visual">
            <span>${car.transmission} · ${car.fuel}</span>
          </div>
          <div class="car-meta">
            <span>5 places</span>
            <span>Clim</span>
          </div>
          <div class="car-head">
            <span class="car-price">${car.price} DHS</span>
            <button class="reserve-btn">Reserver</button>
          </div>
        </article>
      `;
    })
    .join("");

  observeReveal();
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderFleet();
  });
});

searchInput.addEventListener("input", renderFleet);

const observeReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
};

const animateCounters = () => {
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current;
        }, 30);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

renderFleet();
observeReveal();
animateCounters();
