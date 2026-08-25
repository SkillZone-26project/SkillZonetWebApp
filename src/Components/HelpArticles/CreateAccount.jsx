import HelpArticleLayout from "./HelpArticleLayout";
import { createAccountArticle } from "../../data/helpArticlesData";
import Nav from "../../Components/Nav/Nav"

const CreateAccount = () => {
  return (
    <div>
      <Nav />
      <div className="pt-[72px]">
        <HelpArticleLayout article={createAccountArticle} />
      </div>
      

    </div>
    
  );
};

export default CreateAccount;