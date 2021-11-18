import logo from "./assets/images/logo.svg";
import { Button } from "./Components/Button";
import {
  PencilIcon,
  PlayIcon,
  StarIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";
import Table from "./Components/Table";
import { Badge } from "./Components/Badge";
import Pagination from "./Components/Pagination";
function App() {
  return (
    <div className="global-container">
      <head className="header">
        <div className="logo">
          <img src={logo} alt="app's logo" />
        </div>
        <Button fullWidth={false}>Créer un quiz</Button>
      </head>
      <main className="main-part">
        <div className="main-part-inner">
          <Table
            columns={[
              { title: "Nombre de questions", dataIndex: "count" },
              { title: "Administrateur", dataIndex: "administrator" },
              {
                title: "Status",
                render: ({ status }) => {
                  let style = "";
                  if (status === "open") {
                    style = "success";
                  } else if (status === "new") {
                    style = "new";
                  } else {
                    style = "warning";
                  }
                  return <Badge status={style}>{status}</Badge>;
                },
              },
              {
                title: "Actions",
                render: (_) => {
                  return (
                    <div className="flex">
                      <PlayIcon className="h-6 w-6 mr-2" />
                      <PencilIcon className="h-6 w-6 mx-2" />
                      <StarIcon className="h-6 w-6 mx-2" />
                      <ClipboardIcon className="h-6 w-6 ml-2" />
                    </div>
                  );
                },
              },
            ]}
            dataSource={[
              { count: 10, administrator: "Belkacem Berras", status: "open" },
              { count: 20, administrator: "Belkacem Berras", status: "new" },
              { count: 30, administrator: "Belkacem Berras", status: "done" },
              { count: 40, administrator: "Belkacem Berras", status: "open" },
              { count: 50, administrator: "Belkacem Berras", status: "done" },
              { count: 60, administrator: "Belkacem Berras", status: "new" },
              { count: 70, administrator: "Belkacem Berras", status: "open" },
              { count: 80, administrator: "Belkacem Berras", status: "new" },
              { count: 90, administrator: "Belkacem Berras", status: "open" },
              { count: 100, administrator: "Belkacem Berras", status: "done" },
            ]}
          />
          <Pagination currentPage={2} pageNumbers={5} />
        </div>
      </main>
    </div>
  );
}

export default App;
