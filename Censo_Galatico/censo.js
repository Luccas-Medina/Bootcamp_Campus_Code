let result = document.getElementById('result');

async function getData() {

    result.innerHTML = '';

    let get = await fetch('https://swapi.dev/api/planets/?format=json');
    let data = await get.json();
    let ul = document.createElement('ul');

    for (i = 0; i < data.results.length; i++) {

        let li = document.createElement('li');
        let button = document.createElement('button');
        button.textContent = `${data.results[i].name}`;
        button.onclick = ((planet) => () => getPlanetData(planet))(data.results[i])

        li.appendChild(button);
        ul.appendChild(li);
    };

    result.appendChild(ul);
} 

async function getPlanetData(planet) {

    const infoContainer = document.getElementById('planetInfo');
    infoContainer.innerHTML = '';

    let p = document.createElement('p');
    p.innerHTML = `Name: ${planet.name}<br>Population: ${planet.population}<br>Climate: ${planet.climate}`;

    infoContainer.appendChild(p);

    const residentTableBody = document.getElementById('residentInfo').getElementsByTagName('tbody')[0];
    residentTableBody.innerHTML = '';

    if (planet.residents.length > 0) {
        for (const residentUrl of planet.residents) {
            const residentName = await getResidentName(residentUrl);
            const residentBirthYear = await getResidentBirthYear(residentUrl);

            let row = residentTableBody.insertRow();
            let nameCell = row.insertCell(0);
            let birthYearCell = row.insertCell(1);

            nameCell.textContent = residentName;
            birthYearCell.textContent = residentBirthYear;
        }
    } else {
        let noResidents = document.createElement('p');
        noResidents.textContent = 'No residents available.';
        infoContainer.appendChild(noResidents);
    }

    
}

async function searchPlanet(planet) {
    const searchValue = document.getElementById('search').value;
    let getSearch = await fetch(`https://swapi.dev/api/planets/?search=${searchValue}`);
    let searchData = await getSearch.json();

    const infoContainer = document.getElementById('planetInfo');
    infoContainer.innerHTML = '';

    const residentTableBody = document.getElementById('residentInfo').getElementsByTagName('tbody')[0];
    residentTableBody.innerHTML = '';

    if (searchData.results.length > 0) {
        const planet = searchData.results[0];
        let p = document.createElement('p');
        p.innerHTML = `Name: ${planet.name}<br>Population: ${planet.population}<br>Climate: ${planet.climate}`;
        infoContainer.appendChild(p);

        if (planet.residents.length > 0) {
            for (const residentUrl of planet.residents) {
                const residentName = await getResidentName(residentUrl);
                const residentBirthYear = await getResidentBirthYear(residentUrl);

                let row = residentTableBody.insertRow();
                let nameCell = row.insertCell(0);
                let birthYearCell = row.insertCell(1);

                nameCell.textContent = residentName;
                birthYearCell.textContent = residentBirthYear;
            }
        } else {
            let noResidents = document.createElement('p');
            noResidents.textContent = 'No residents available.';
            infoContainer.appendChild(noResidents);
        }
    } else {
        infoContainer.textContent = 'No planets found.';
    }

} 

async function getResidentName(url) {
    const response = await fetch(url);
    const residentData = await response.json();
    return residentData.name; 
}

async function getResidentBirthYear(url) {
    const response = await fetch(url);
    const residentData = await response.json();
    return residentData.birth_year; 
}






