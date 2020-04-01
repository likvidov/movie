import React from "react";

class PaginationItem extends React.Component {

  getCheckMinPageClass = value => {
    return `page-link ${value === 1 ? 'd-none' : ''} `;
  }

  getCheckMaxPageClass = (value, maxPage) => {
    return `page-link ${value === maxPage ? 'd-none' : ''} `;
  }

  render() {
    const { currentPage, totalPages, switherPage } = this.props;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a 
              className={this.getCheckMinPageClass(currentPage)} 
              href="!#"
              onClick={switherPage.bind(null, currentPage - 1)}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a 
              className={this.getCheckMinPageClass(currentPage)} 
              href="!#"
              onClick={switherPage.bind(null, currentPage - 1)}>
              { currentPage !== 1 ? currentPage - 1 : ""}
            </a>
          </li>
          <li className="page-item" disabled>
            <a 
              className="page-link btn-primary disabled" 
              href="!#"
              role="button" 
              aria-disabled="true">
              { currentPage }
            </a>
          </li>
          <li className="page-item">
            <a 
              className={this.getCheckMaxPageClass(currentPage, totalPages)} 
              href="!#"
              onClick={switherPage.bind(null, currentPage + 1)}>
              {currentPage + 1}
            </a>
          </li>
          <li className="page-item">
            <a 
              className={this.getCheckMaxPageClass(currentPage, totalPages)} 
              href="!#"
              onClick={switherPage.bind(null, totalPages)}>
              {totalPages}
            </a>
          </li>
          <li className="page-item">
            <a 
              className={this.getCheckMaxPageClass(currentPage, totalPages)} 
              href="!#"
              onClick={switherPage.bind(null, currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    )
  }
} 

export default PaginationItem;