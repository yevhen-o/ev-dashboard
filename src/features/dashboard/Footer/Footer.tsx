import "./Footer.scss";
export function Footer() {
  return (
    <footer className="dashboard-footer">
      <p>© {new Date().getFullYear()} EV Dashboard</p>
    </footer>
  );
}
