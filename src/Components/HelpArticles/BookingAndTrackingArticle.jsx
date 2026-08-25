import HelpBookingAndTrackingLayout from "./HelpBookingAndTrackingLayout";
import { bookingAndTrackingArticle } from "../../data/helpArticlesData";
import Nav from "../../Components/Nav/Nav"

const BookingAndTrackingArticle = () => {
  return (
    <div>
      <Nav />
      <div className="pt-[72px]">
        <HelpBookingAndTrackingLayout article={bookingAndTrackingArticle} />
      </div>
      

    </div>
  )
}

export default BookingAndTrackingArticle