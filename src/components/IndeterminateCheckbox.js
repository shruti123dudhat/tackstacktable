import React from "react";

function IndeterminateCheckbox({ indeterminate, ...rest }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

export default IndeterminateCheckbox;
{/* <ul>
            <li>
              You are on page number:{" "}
              {tableInstance.options.state.pagination.pageIndex}
            </li>
            <li>Total pages: {tableInstance.getPageCount() - 1}</li>
          </ul> */}
{/* <div>
          <label>
            <input
              {...{
                type: "checkbox",
                checked: tableInstance.getIsAllColumnsVisible(),
                onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
          {tableInstance.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id}>
                <label>
                  <input
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{" "}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div> */}
