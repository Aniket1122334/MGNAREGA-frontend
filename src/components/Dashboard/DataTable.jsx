import React from "react";
import styles from "./DataTable.module.css";

const MGNREGADataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="container mt-4">
        <h4 className="text-center mb-3">MGNREGA District Data Overview</h4>
        <p className="text-center">
          No data available for the selected state/district.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-3">MGNREGA District Data Overview</h4>

      {/* ✅ Table view (for larger screens) */}
      <div className={`table-responsive ${styles.desktopView}`}>
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Financial Year</th>
              <th>Month</th>
              <th>Approved Labour Budget</th>
              <th>Avg Wage Rate / Day</th>
              <th>Avg Days Employment / HH</th>
              <th>Number of Ongoing Works</th>
              <th>Total No. of Works Taken Up</th>
              <th>Total No. of Workers</th>
              <th>Total Individuals Worked</th>
              <th>Total Households Worked</th>
              <th>Total No. of Job Cards Issued</th>
              <th>Total No. of Active Job Cards</th>
              <th>Total No. of Active Workers</th>
              <th>Women Persondays</th>
              <th>Differently Abled Worked</th>
              <th>Wages (₹ Lakhs)</th>
              <th>Total Expenditure (₹ Lakhs)</th>
            </tr>
          </thead>

          <tbody>
            {data.map((record, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{record.fin_year}</td>
                <td>{record.month}</td>
                <td>{record.approvedLabourBudget || 0}</td>
                <td>{record.averageWageRate || 0}</td>
                <td>{record.averageDaysEmployment || 0}</td>
                <td>{record.numberOfOngoingWorks || 0}</td>
                <td>{record.totalNoOfWorksTakenup || 0}</td>
                <td>{record.totalNoOfWorkers || 0}</td>
                <td>{record.totalIndividualsWorked || 0}</td>
                <td>{record.totalHouseholdsWorked || 0}</td>
                <td>{record.totalNoOfJobCardsIssued || 0}</td>
                <td>{record.totalNoOfActiveJobCards || 0}</td>
                <td>{record.totalNoOfActiveWorkers || 0}</td>
                <td>{record.womenPersondays || 0}</td>
                <td>{record.differentlyAbledWorked || 0}</td>
                <td>{record.wages || 0}</td>
                <td>{record.totalExpenditure || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Card view (for mobile) */}
      <div className={styles.mobileView}>
        {data.map((record, idx) => (
          <div key={idx} className={styles.card}>
            <h6 className={styles.cardTitle}>
              {record.district_name || "District"} ({record.month},{" "}
              {record.fin_year})
            </h6>
            <div className={styles.cardBody}>
              <p>
                <strong>Approved Labour Budget:</strong>{" "}
                {record.approvedLabourBudget || 0}
              </p>
              <p>
                <strong>Avg Wage Rate / Day:</strong>{" "}
                {record.averageWageRate || 0}
              </p>
              <p>
                <strong>Avg Days Employment / HH:</strong>{" "}
                {record.averageDaysEmployment || 0}
              </p>
              <p>
                <strong>Ongoing Works:</strong>{" "}
                {record.numberOfOngoingWorks || 0}
              </p>
              <p>
                <strong>Total Works Taken Up:</strong>{" "}
                {record.totalNoOfWorksTakenup || 0}
              </p>
              <p>
                <strong>Total Workers:</strong> {record.totalNoOfWorkers || 0}
              </p>
              <p>
                <strong>Total Households Worked:</strong>{" "}
                {record.totalHouseholdsWorked || 0}
              </p>
              <p>
                <strong>Wages (₹ Lakhs):</strong> {record.wages || 0}
              </p>
              <p>
                <strong>Total Expenditure (₹ Lakhs):</strong>{" "}
                {record.totalExpenditure || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MGNREGADataTable;
