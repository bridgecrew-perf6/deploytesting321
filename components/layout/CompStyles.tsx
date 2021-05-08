import Head from "next/head";
import styles from "../../appStyles/appStyles.module.css";
import { IProps } from "../appTypes/appType";

// export default function WithCustomStyles({ children }) {
const WithCustomStyles: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="preload" href="/fonts/malgun.ttf" as="font" crossOrigin="" />
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div>{children}</div>
    </div>
  );
};

export default WithCustomStyles;

interface CardFormProps {
  ctrStyle: string;
  title: string;
}

export const CardForm: React.FC<CardFormProps> = (props) => {
  const pageTitle = `PoldIt ${props.title.replace("/", "")}`;

  return (
    <div className="jumbotron vertical-center">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div
        className="container-fluid card text-black p-0"
        style={{ maxWidth: props.ctrStyle }}
      >
        {props.children}
      </div>
    </div>
  );
};

export const PageForm: React.FC<IProps> = (props) => {
  const pageTitle = `PoldIt ${props.title.replace("/", "")}`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={`d-flex-row ${styles.appbg_other} vh-100`}>
        {props.children}
      </div>
    </div>
  );
};
