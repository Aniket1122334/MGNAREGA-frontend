import React, { useEffect, useState } from "react";
import Select from "react-select"; // ✅ Added for searchable dropdowns
import DataTable from "./DataTable";
import Header from "./Header";
import { fetchAllData } from "../../utils/api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  //Fetch all data initially
  useEffect(() => {
    const getData = async () => {
      try {
        const records = await fetchAllData();
        setData(records);

        const uniqueStates = [...new Set(records.map((r) => r.state_name))]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setStates(uniqueStates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // ✅ Handle State selection
  const handleStateChange = (selectedOption) => {
    const state = selectedOption?.value || "";
    setSelectedState(selectedOption);
    setSelectedDistrict(null);

    const filteredDistricts = [
      ...new Set(
        data.filter((r) => r.state_name === state).map((r) => r.district_name)
      ),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    setDistricts(filteredDistricts);
  };

  //Handle District selection
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 200);
  };

  //Filtered data for table
  const filteredData = data.filter(
    (r) =>
      (!selectedState || r.state_name === selectedState.value) &&
      (!selectedDistrict || r.district_name === selectedDistrict.value)
  );

  //Loader while fetching main data
  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className="spinner-border text-primary" role="status" />
        <p className={styles.loaderText}>waiting... (प्रतीक्षा करे)</p>
      </div>
    );
  }

  //Prepare options for react-select
  const stateOptions = states.map((state) => ({
    value: state,
    label: state,
  }));

  const districtOptions = districts.map((district) => ({
    value: district,
    label: district,
  }));

  return (
    <>
      <Header />
      <div className="container mt-4">
        {/* ---------- STATE SELECT ---------- */}
        <div className="states mb-3">
          <form>
            <label className="form-label fw-bold">
              Please select the state (कृपया राज्य चुनिए)
            </label>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              options={stateOptions}
              placeholder="-- Choose or search State --"
              isSearchable
            />
          </form>
        </div>

        {/* ---------- DISTRICT SELECT ---------- */}
        {selectedState && (
          <div className="districts mb-4">
            <form>
              <label className="form-label fw-bold">
                Please select the district (कृपया ज़िला चुनिए)
              </label>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                options={districtOptions}
                placeholder="-- Choose or search District --"
                isSearchable
                isDisabled={!districtOptions.length}
              />
            </form>
          </div>
        )}

        {/* ---------- TABLE LOADER ---------- */}
        {selectedState && selectedDistrict && tableLoading && (
          <div className={styles.tableLoaderContainer}>
            <div className="spinner-border text-success" role="status" />
            <p className={styles.tableLoaderText}>
              Loading table... (प्रतीक्षा करे)
            </p>
          </div>
        )}

        {/* ---------- DATA TABLE ---------- */}
        {selectedState && selectedDistrict && !tableLoading && (
          <DataTable data={filteredData} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
