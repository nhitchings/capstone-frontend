import './ReserveTable.css';

function ReserveTable() {
    return (
        <section className='lemon-section container'>
            <h1>Reserve a Table</h1>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" />
                <label for="time">Time:</label>
                <input type="time" id="time" name="time" />
                <label for="guests">Number of Guests:</label>
                <input type="number" id="guests" name="guests" />
                <label for="occasion">Occasion:</label>
                <input type="text" id="occasion" name="occasion" />
                <input type="submit" value="Reserve" />
            </form>
        </section>
    );
};

export default ReserveTable;