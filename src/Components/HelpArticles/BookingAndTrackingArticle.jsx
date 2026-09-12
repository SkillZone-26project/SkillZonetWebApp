import HelpLayout from "./HelpLayout";
import { bookingAndTrackingArticle } from "../../data/helpArticlesData";
import Nav from "../../Components/Nav/Nav"

const BookingAndTrackingArticle = () => {
  return (
    <div>
      <Nav />
      <div className="pt-[72px]">
        <HelpLayout article={bookingAndTrackingArticle} />
      </div>
      

    </div>
  )
}

export default BookingAndTrackingArticle