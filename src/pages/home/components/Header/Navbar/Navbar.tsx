import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./navbar.module.css";
import VisitList from "../../VisitList/VisitList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface NavbarProps {
    visits: any[];
    toggleSelection: (id: number) => void;  // Corrigido para aceitar o parâmetro 'id'
    openEditModal: (id: number) => void;    // Corrigido para aceitar o parâmetro 'id'
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
  }) => {
    const [value, setValue] = React.useState<number>(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    // Filtra as visitas conforme o estado da aba
    const pendingVisits = visits.filter(v => v.isPending);
    const completedVisits = visits.filter(v => !v.isPending);
  
    return (
      <nav className={styles.navbar}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Mostrar Todas" {...a11yProps(0)} />
              <Tab label="Pendentes" {...a11yProps(1)} />
              <Tab label="Concluídas" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <VisitList
              visits={visits} // Passar todas as visitas
              toggleSelection={toggleSelection}
              openEditModal={openEditModal}
              visitsPerPage={10} // Defina aqui o número de visitas por página
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <VisitList
              visits={pendingVisits} // Passar apenas visitas pendentes
              toggleSelection={toggleSelection}
              openEditModal={openEditModal}
              visitsPerPage={10} // Defina aqui o número de visitas por página
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <VisitList
              visits={completedVisits} // Passar apenas visitas concluídas
              toggleSelection={toggleSelection}
              openEditModal={openEditModal}
              visitsPerPage={10} // Defina aqui o número de visitas por página
            />
          </TabPanel>
        </Box>
      </nav>
    );
  };
  

export default Navbar;
