const TOTAL_SEATS = 10;
let seats = new Array(TOTAL_SEATS).fill(null);
let waitingList = [];

document.addEventListener("DOMContentLoaded", generateSeats);





function generateSeats() {
    let seatContainer = document.getElementById("seatContainer");
    seatContainer.innerHTML = ""; // Clear old UI
    seats.forEach((passenger, index) => {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = index + 1;

        if (passenger) {
            seat.classList.add("booked");
            seat.textContent = "🚫";
        } else {
            seat.addEventListener("click", () => cancelSeat(index));
        }

        seatContainer.appendChild(seat);
    });

    updateWaitingList();
}





function bookSeat() {
    let name = document.getElementById("passengerName").value;
    if (!name) {
        alert("Enter a passenger name!");
        return;
    }

    let seatIndex = seats.indexOf(null);
    if (seatIndex !== -1) {
        seats[seatIndex] = name;
        alert(`${name} booked seat ${seatIndex + 1}`);
    } else {
        waitingList.push(name);
        alert(`${name} added to the waiting list`);
    }

    document.getElementById("passengerName").value = "";
    generateSeats();
}





function cancelSeat(index) {
    if (seats[index] !== null) {
        alert(`Seat ${index + 1} canceled for ${seats[index]}`);
        seats[index] = null;

      
        if (waitingList.length > 0) {
            let nextPassenger = waitingList.shift();
            seats[index] = nextPassenger;
            alert(`${nextPassenger} moved from waiting list to seat ${index + 1}`);
        }

        generateSeats();
    }
}





function updateWaitingList() {
    let waitingListUI = document.getElementById("waitingList");
    waitingListUI.innerHTML = "";
    waitingList.forEach((name) => {
        let li = document.createElement("li");
        li.textContent = name;
        waitingListUI.appendChild(li);
    });
}
