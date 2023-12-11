/**
 * It displays a friendly message to the user if they try to access a page that they are not authorized to access
 * @returns Friendly message component
 */

const Forbidden = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </main>
  );
};

export default Forbidden;
