document.getElementById("candidatureForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    const currentTime = Date.now();
    
    if (lastSubmissionTime && (currentTime - lastSubmissionTime < 3600000)) {
        const timeLeft = Math.ceil((3600000 - (currentTime - lastSubmissionTime)) / 1000);
        alert(`Vous devez attendre ${timeLeft} secondes avant de soumettre à nouveau.`);
        return;
    }

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const platform = document.getElementById("platform").value;
    const motivation = document.getElementById("motivation").value;
    const experience = document.getElementById("experience").value;
    const availability = document.getElementById("availability").value;

    const webhookData = {
        content: "Nouvelle candidature pour le clan Earsk",
        embeds: [{
            title: "Candidature de " + name,
            fields: [
                { name: "Pseudo", value: name },
                { name: "Âge", value: age },
                { name: "Plateforme", value: platform },
                { name: "Pk veux-tu rejoindre notre team", value: motivation },
                { name: "Tu es quel rank que ce soit en Ranked ou Reloaded Ranked", value: experience },
                { name: "Horaires de disponibilité", value: availability }
            ],
            color: 3447003 
        }]
    };

    fetch('https://discord.com/api/webhooks/1299301318879346768/ohOkvrdfp2KBKTZNOnTiB6fy6b-jG9cXDqRJlSlpC0-WxTligZzDEDS2BCzzsJsio2gR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
    })
    .then(response => {
        if (response.ok) {
            alert("Candidature envoyée avec succès !");
            localStorage.setItem("lastSubmissionTime", Date.now());
            document.getElementById("candidatureForm").reset();
        } else {
            console.error('Erreur:', response.statusText);
            alert("Une erreur s'est produite : " + response.statusText);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    });
});
