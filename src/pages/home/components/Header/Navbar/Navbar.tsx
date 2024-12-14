import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import VisitList from "../../VisitList/VisitList";
import NorthRowIcon from "../../../../../images/north.svg";
import SouthRowIcon from "../../../../../images/south.svg";
import styles from "./navbar.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface NavbarProps {
  visits: any[];
  toggleSelection: (id: number) => void;
  openEditModal: (id: number) => void;
  setFilter: (filter: string) => void; // Definindo setFilter aqui
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const Navbar: React.FC<NavbarProps> = ({
  visits,
  toggleSelection,
  openEditModal,
  setFilter,
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
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Mostrar Todas" {...a11yProps(0)} />
            <Tab label="Pendentes" {...a11yProps(1)} />
            <Tab label="Concluídas" {...a11yProps(2)} />
          </Tabs>
          <div style={{ gap: ".4rem", display: "flex" }}>
            <button className={styles.rowButton}>
              <img src={NorthRowIcon} alt="Ordenar para cima" />
            </button>
            <button className={styles.rowButton}>
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
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VisitList
            visits={visits.filter((v) => v.isPending)}
            toggleSelection={toggleSelection}
            openEditModal={openEditModal}
            visitsPerPage={10}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VisitList
            visits={visits.filter((v) => !v.isPending)}
            toggleSelection={toggleSelection}
            openEditModal={openEditModal}
            visitsPerPage={10}
          />
        </TabPanel>
      </Box>
    </nav>
  );
};

export default Navbar;