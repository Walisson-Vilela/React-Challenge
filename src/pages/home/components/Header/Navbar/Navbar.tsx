import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NorthRowIcon from "../../../../../images/north.svg";
import SouthRowIcon from "../../../../../images/south.svg";
import VisitList from '../../VisitList/VisitList';
import styles from "./navbar.module.css";
import TabPanel from "../../../../../components/TabPanel/TabPanel";

interface NavbarProps {
  visits: any[];
  toggleSelection: (id: number) => void;
  openEditModal: (id: number) => void;
  setFilter: (filter: string) => void;
  sortOrder: "asc" | "desc";
  handleSort: (order: "asc" | "desc") => void;
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const Navbar: React.FC<NavbarProps> = ({
  visits,
  toggleSelection,
  openEditModal,
  setFilter,
  sortOrder,
  handleSort,
}) => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setFilter("all");
    } else if (newValue === 1) {
      setFilter("pending");
    } else {
      setFilter("completed");
    }
  };

  return (
    <nav className={styles.navbar}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 3rem",
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Mostrar Todas" {...a11yProps(0)} />
            <Tab label="Pendentes" {...a11yProps(1)} />
            <Tab label="Concluídas" {...a11yProps(2)} />
          </Tabs>
          <div style={{ gap: ".4rem", display: "flex" }}>
            <button
              className={styles.rowButton}
              onClick={() => handleSort("asc")}
            >
              <img src={NorthRowIcon} alt="Ordenar para cima" />
            </button>
            <button
              className={styles.rowButton}
              onClick={() => handleSort("desc")}
            >
              <img src={SouthRowIcon} alt="Ordenar para baixo" />
            </button>
          </div>
        </Box>
        <TabPanel value={value} index={0}>
          <VisitList
            visits={visits}
            toggleSelection={toggleSelection}
            openEditModal={openEditModal}
            visitsPerPage={10}
            sortOrder={sortOrder}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VisitList
            visits={visits.filter((v) => v.isPending)}
            toggleSelection={toggleSelection}
            openEditModal={openEditModal}
            visitsPerPage={10}
            sortOrder={sortOrder}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VisitList
            visits={visits.filter((v) => !v.isPending)}
            toggleSelection={toggleSelection}
            openEditModal={openEditModal}
            visitsPerPage={10}
            sortOrder={sortOrder}
          />
        </TabPanel>
      </Box>
    </nav>
  );
};

export default Navbar;
