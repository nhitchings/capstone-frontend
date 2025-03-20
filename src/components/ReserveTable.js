import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
import './ReserveTable.css';
import Modal from './Modal';
import Confetti from 'react-confetti';

function ReserveTable({ availableTimes, setAvailableTimes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "", email: "", date: "", time: "", guests: "", occasion: ""
    });

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        date: Yup.date()
            .required("Date is required")
            .min(new Date(), "Date must be today or later"),
        time: Yup.string().required("Time is required"),
        guests: Yup.number()
            .min(1, "At least 1 guest required")
            .max(20, "Maximum 20 guests allowed")
            .required("Number of guests is required"),
        occasion: Yup.string().required("Occasion is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            date: "",
            time: "",
            guests: "",
            occasion: ""
        },
        validationSchema, // Use Yup validation schema
        validateOnBlur: true,
        onSubmit: values => {
            setFormData(values);
            localStorage.setItem("reservationData", JSON.stringify(values)); // Save to localStorage
            setIsModalOpen(true);
            formik.resetForm();
            setAvailableTimes(new Date());
        },
    });

    // Load saved form data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("reservationData");
        if (savedData) {
            setFormData(JSON.parse(savedData)); // Set retrieved data in state
        }
    }, []);

    useEffect(() => {
        if (formik.values.date) {
            setAvailableTimes(new Date(formik.values.date), formik.values.time);
        }
    }, [formik.values.date]);

    const availableTimesOptions = availableTimes.map(time => (
        <option key={time} value={time}>{time}</option>
    ));

    return (
        <section id="reserve-table-section" className='lemon-section container'>
            {/* Modal for displaying submitted reservation details */}
            <Modal heading="Opa!" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {formData && (
                    <div>
                        <Confetti width={300} height={271} gravity={0.1} numberOfPieces={50}/>
                        <h3>Reservation Details</h3>
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                        <p><strong>Guests:</strong> {formData.guests}</p>
                        <p><strong>Occasion:</strong> {formData.occasion}</p>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                )}
            </Modal>
            <h1>Reserve a Table</h1>
            <form role="form" onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name:
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <p className="error">{formik.errors.name}</p> : null}
                </label>

                <label htmlFor="email">Email:
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p> : null}
                </label>

                <label htmlFor="date">Date:
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? <p className="error">{formik.errors.date}</p> : null}
                </label>

                <label htmlFor="time">Time:
                <select
                    id="time"
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                >
                    <option value="">Select a time</option>
                    {availableTimesOptions}
                </select>
                {formik.touched.time && formik.errors.time ? <p className="error">{formik.errors.time}</p> : null}
                </label>

                <label htmlFor="guests">Number of Guests:
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guests}
                />
                {formik.touched.guests && formik.errors.guests ? <p className="error">{formik.errors.guests}</p> : null}
                </label>

                <label htmlFor="occasion">Occasion:
                <input
                    type="text"
                    id="occasion"
                    name="occasion"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.occasion}
                />
                {formik.touched.occasion && formik.errors.occasion ? <p className="error">{formik.errors.occasion}</p> : null}
                </label>

                <input type="submit" value="Reserve" disabled={!formik.isValid || formik.isSubmitting} />

                {/* Conditional button if reservation is in local storage */}
                {localStorage.getItem("reservationData") &&
                    <button className="secondary" type="button" onClick={() => setIsModalOpen(true)}>View Reservation</button>
                }
            </form>
        </section>
    );
};

export default ReserveTable;