/**
 * It displays a friendly message to the user if they try to access a page that doesn't exist
 *
 * @returns NotFound component
 */

const NotFound = () => {
    return (
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
    )
}

export default NotFound;