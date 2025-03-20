import { useFormik } from 'formik';
import './ReserveTable.css';

function ReserveTable(props) {
    const { availableTimes, setAvailableTimes } = props;
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            date: '',
            time: '',
            guests: '',
            occasion: ''
        },
        onSubmit: values => {
            setAvailableTimes(previousTimes => previousTimes.filter(time => time !== values.time));
            alert(JSON.stringify(values, null, 2));
        },
    });

    const availableTimesOptions = availableTimes.map(time => (
        <option key={time} value={time}>{time}</option>
    ));

    return (
        <section id="reserve-table-section" className='lemon-section container'>
            <h1>Reserve a Table</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="date">Date:</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="date" id="date"
                    name="date" />
                <label htmlFor="time">Time:</label>
                <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                    id="time"
                    name="time">
                    {availableTimesOptions}
                </select>
                <label htmlFor="guests">Number of Guests:</label>
                <input type="number" id="guests" name="guests" />
                <label htmlFor="occasion">Occasion:</label>
                <input type="text" id="occasion" name="occasion" />
                <input type="submit" value="Reserve" />
            </form>
        </section>
    );
};

export default ReserveTable;