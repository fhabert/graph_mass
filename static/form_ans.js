const rm = document.getElementById('add-rm');
const rmValue = document.getElementById('rm-input');
let ar = ["bem-input", "level-bem-input", "left-front-feat-input", "right-front-seat-input", "left-aft-seat-input", "right-aft-seat-input", 
        "cargo-zone-1-input", "cargo-zone-2-input", "block-fuel-input"];
let arHtml = [];
ar.forEach((el) => {
    arHtml.push(document.getElementById(el));
});

if (rm) {
    rm.addEventListener('click', (event) => {
        let totalMass = 0;
        arHtml.forEach((el) => {
            if (el.value !== "") {
                const mass = Number.parseInt(el.value, 10);
                totalMass += mass;
            }
        })
        rmValue.value = totalMass;
    })
}
const btmValues = ['tom-input', 'trip-input', 'landing-input', 'fuel-input', 'landing-alternate-input'];
let btmHtml = [];
btmValues.forEach((e) => {
    btmHtml.push(document.getElementById(e));
})

const minusTaxi = document.getElementById('minus-taxi');
if (minusTaxi) {
    minusTaxi.addEventListener('click', () => {
        btmHtml[0].value = rmValue.value - 3;
    })
}
const minusTrip = document.getElementById('minus-trip');
if (minusTrip) {
    minusTrip.addEventListener('click', () => {
        btmHtml[2].value = btmHtml[0].value - btmHtml[1].value;
    })
}
const minusLm = document.getElementById('minus-lm');
if(minusLm) {
    minusLm.addEventListener('click', () => {
        btmHtml[4].value = btmHtml[2].value - btmHtml[3].value;
    })
}
const momentBtn = document.getElementById('moment-btn');
let momentHtml = [];
for (let i = 0; i < ar.length; i++) {
    if (i !== 1) {
        momentHtml.push(document.getElementById(`moment-${ar[i]}`))
    }
}
const textMoment = ["moment-rm-input", "moment-tom-input", "moment-trip-input", "moment-landing-input", 
                    "moment-fuel-input", "moment-landing-alternate-input"]

const levelArmsInput = ["rm-level-input", "tom-level-input", "level-landing-input", "level-landing-alternate-input"];
let levelArmsHtml = [];
levelArmsInput.forEach((e) => {
    levelArmsHtml.push(document.getElementById(e));
});
let momentBottomHtml = [];
if (momentBtn) {
    momentBtn.addEventListener('click', (e) => {
        let btnList = [rm, minusTaxi, minusTrip, minusLm, momentBtn];
        btnList.forEach((item) => {
            item.disabled = true;
        })
        btmHtml.unshift(rmValue);
        let levelArms = [Number.parseInt(arHtml[0].value, 10), 0.94, 0.94, 1.85, 1.85, 2.41, 3.12, 1.22];
        momentHtml[0].innerText = Number.parseInt(arHtml[0].value, 10) * Number.parseInt(arHtml[1].value, 10);
        for (let i = 1; i < levelArms.length; i++) {
            const total = Math.round(Number.parseInt(arHtml[i+1].value, 10) * levelArms[i]);
            momentHtml[i].innerText = total;
        }
        let sumMomentRm = 0;
        for (let i = 0; i < momentHtml.length; i++) {
            sumMomentRm += Number.parseInt(momentHtml[i].innerText, 10);
        }
        const levelRm = sumMomentRm / Number.parseInt(rmValue.value, 10);
        const sumMomentTom = sumMomentRm + 3.66;
        const levelTom = sumMomentTom / Number.parseInt(btmHtml[0].value, 10);
        const momentTrip = Number.parseInt(btmHtml[1].value, 10) * 1.22;
        const sumMomentTrip = sumMomentTom + momentTrip;
        const levelLm = sumMomentTrip / Number.parseInt(btmHtml[2].value, 10);
        const momentLm = Number.parseInt(btmHtml[2].value, 10) * levelLm;

        const momentFuel = Number.parseInt(btmHtml[3].value, 10) * 1.22;
        const sumMomentFuel = sumMomentTrip + momentLm + momentFuel;
        const levelLmAlter = sumMomentFuel / Number.parseInt(btmHtml[4].value, 10);
        let levelArmsTwo = [levelRm, levelTom, levelLm, levelLmAlter];

        for (let i = 0; i < levelArmsHtml.length; i++) {
            levelArmsHtml[i].value = Math.round(levelArmsTwo[i]);
        }

        textMoment.forEach((el) => {
            momentBottomHtml.push(document.getElementById(el));
        })
        let levelArmsTwoComplete = [levelRm, levelTom, 1.22, levelLm, 1.22, levelLmAlter];
        for (let i = 0; i < levelArmsTwoComplete.length; i++) {
            momentBottomHtml[i].innerText = Math.round(Number.parseInt(btmHtml[i].value, 10) * levelArmsTwoComplete[i]);
        }

        const futureLink = document.querySelector('.future-link');
        const zfm = Number.parseInt(rmValue.value, 10) - Number.parseInt(arHtml[8].value, 10);

        let xsGraph = [zfm, btmHtml[0].value, btmHtml[2].value];
        let ysGraph = [levelRm, levelTom, levelLm];
        let pointsGraph = [];
        for (let i = 0;  i < xsGraph.length; i++) {
            pointsGraph.push(xsGraph[i]);
            pointsGraph.push(ysGraph[i]);
        }
        const plane = document.getElementById('plane-input').value;
        const infoDb = [plane, btmHtml[0].value, btmHtml[2].value];
        futureLink.insertAdjacentHTML('beforeend', `<a href="/graph?points=${pointsGraph}&db=${infoDb}" class="btn btn-light-green" id="link-graph">Show Graph</a>`)
    })
}

let tooHeavy = [rmValue, btmHtml[0], btmHtml[2], btmHtml[4]];
tooHeavy.forEach((el) => {
    el.addEventListener('blur', (e) => {
        if (Number.parseInt(e.currentTarget.value, 10) > 1157) {
            alert('Your plane will never flie.. Too HEAVY !!');
        }
    })
})