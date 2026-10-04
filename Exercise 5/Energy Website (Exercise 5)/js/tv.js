const energyEfficientTVs = [
    {
        name: "TCL 43\" P7K 4K QLED Google TV",
        description: "An affordable entry-point into energy-efficient viewing. This model uses Quantum Dot technology to deliver over a billion colors while maintaining a high efficiency rating suitable for smaller living spaces or bedrooms.",
        imageURL: "https://aws-obg-image-lb-2.tcl.com/content/dam/brandsite/product/tv/p/p7k/id/75-0312/1.png?t=1741745993633&w=800",
        price: 495.00,
        screenSize: "43 inches",
        energyRating: 5.0,
        technology: "QLED",
        id: "1"
    },
    {
        name: "LG 65\" QNED86A Mini-LED 4K Smart TV",
        description: "A mid-range powerhouse that strikes a perfect balance between size and sustainability. It combines Quantum Dot and NanoCell technology with Mini-LED backlighting to achieve a leading 5.5-star energy rating.",
        imageURL: "https://www.lg.com/content/dam/channel/wcms/my/2025_ms_lg-com/tv/qned-evo/qned85/gp1/gallery/65-qned85-a/gallery/65QNED86_Infill_0000_2010.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
        price: 2199.00,
        screenSize: "65 inches",
        energyRating: 5.5,
        technology: "QNED Mini-LED",
        id: "2"
    },
    {
        name: "Sony Bravia 8 II 65\" QD-OLED 4K Google TV",
        description: "The premium choice for cinephiles. While OLEDs generally consume more power than LEDs, the 2026 Bravia 8 II features an ultra-efficient processor and pixel-level dimming that optimizes power consumption for HDR content.",
        imageURL: "https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY25_BRAVIA8II_01_Front_M?$productIntroPlatemobile$&fmt=png-alpha",
        price: 3899.00,
        screenSize: "65 inches",
        energyRating: 4.5,
        technology: "QD-OLED",
        id: "3"
    }
];


function displayTVList() {
    energyEfficientTVs.forEach(createCard);
}

function createCard(data) {
    const divCard = document.createElement("div");
    const divImg = document.createElement("div");
    const spanTag = document.createElement("span");
    const img = document.createElement("img");
    const divDesc = document.createElement("div");
    const h3 = document.createElement("h3");
    const pDesc = document.createElement("p");
    const button = document.createElement("button");

    divCard.classList.add("card");
    divImg.classList.add("image");
    spanTag.classList.add("tag");
    divDesc.classList.add("desc");
    
    img.alt = data.name;
    img.src = data.imageURL;

    button.addEventListener("click", () => showDialog(data));
    button.textContent = "View more";

    spanTag.textContent = `${data.energyRating} stars`;
    h3.textContent = `${data.name}`;
    pDesc.textContent = `${data.description.slice(0, 100)}...`;

    divCard.appendChild(divImg);
    divCard.appendChild(divDesc);
    divImg.appendChild(spanTag);
    divImg.appendChild(img);
    divDesc.appendChild(h3);
    divDesc.appendChild(pDesc);
    divDesc.appendChild(button);

    document.querySelector(".items").appendChild(divCard);

}


function showDialog(data) {
    const dialog = document.querySelector("#tv-dialog");

    if (!dialog) {
        console.error("The television details dialog is missing from the page.");
        return;
    }

    document.querySelector("#tv-name").textContent = data.name;
    document.querySelector("#tv-price").textContent = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD"
    }).format(data.price);
    document.querySelector("#tv-size").textContent = data.screenSize;
    document.querySelector("#tv-rating").textContent = data.energyRating;
    document.querySelector("#tv-tech").textContent = data.technology;
    document.querySelector("#tv-desc").textContent = data.description;

    dialog.showModal();
}