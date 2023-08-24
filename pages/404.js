import Link from "next/link";
import React, { Fragment } from "react";
export default function Home() {
  return (
    <Fragment>
      <div id="page-content">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="empty-page-content text-center">
                <h1 className="text-lg">404 Page Not Found</h1>
                <p>The page you requested does not exist.</p>
                <p>
                  <Link href="/">
                    <span className="btn btn--has-icon-after">Home</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
