import Navbar from './components/NavBar';
import EventPage from './components/EventPage'
import WorkshopForm from './components/dashBoard/inputForms/WorkshopForm'; // Assuming WorkshopForm is exported correctly
import EventForm from './components/dashBoard/inputForms/EventForm';
import DashboardCard from './components/DashboardCard';
import CoursesForm from './components/dashBoard/inputForms/CoursesForm';
import CoursesForm1 from './components/dashBoard/inputForms/CoursesForm1';
import PeopleForm from './components/dashBoard/inputForms/PeopleForm';

function App() {

  return (
    <>
      <Navbar />
      <WorkshopForm />
      <EventPage />
      {/* <DashboardCard/>
      <EventForm/> */}
      <CoursesForm/>
      <CoursesForm1/>
      <PeopleForm/>
    </>
  );
}

export default App;
