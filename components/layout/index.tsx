import { IProps } from "../appTypes/appType";
import NavBar from "../pageComponents/Other/NavBar";
import { PageForm } from "./CompStyles";

export const SitePageContainer: React.FC<IProps> = (props) => {
  return (
    <PageForm title={props.title}>
      <NavBar />
      {props.children}
    </PageForm>
  );
};
