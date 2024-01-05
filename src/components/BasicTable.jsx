import React, { useState, useMemo, } from "react";
import { useTable } from "@tanstack/react-table";
import "./table.css";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  columnDefWithCheckBox,
} from "./columns";
import FilterFunction from "./FilterFunction";
import dataJSON from "./data.json";

const BasicTable = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDefWithCheckBox = useMemo(() => columnDefWithCheckBox, []);
  const defaultColumn = useMemo(() => {
    return {
      tableProp: "hello world",
    };
  }, []);

  const [columnOrder, setColumnOrder] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(finalData);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);


  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    setOpen(false);
  };

  const tableInstance = useReactTable({
    columns: finalColumnDefWithCheckBox,
    data: finalData,
    defaultColumn: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnOrder: columnOrder,
      columnFilters: columnFilters,
      globalFilter: filtering,
      rowSelection: rowSelection,
      columnVisibility: columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChanged: setFiltering,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
  });

  return (
    <>

      <div className="g-search">
        {/* selected item */}
        <div>
          <span>Display Item </span>
          <select
            value={tableInstance.options.state.pagination.pageSize}
            onChange={(e) => tableInstance.setPageSize(e.target.value)}
          >
            {[10, 25, 50].map((pageSizeEl) => (
              <option key={pageSizeEl} value={pageSizeEl}>
                {pageSizeEl}
              </option>
            ))}
          </select>
        </div>
        <div className="m-btn">
          {/* --------------------------------------------- */}
          <div className='dropdown'>
            <div className='dropdown-header button' onClick={toggleDropdown}>
              {selectedItem ? items.find(item => item.id == selectedItem).label : "Hide Line"}
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
              {tableInstance.getAllLeafColumns().map((column) => {
                return (
                  <div className="dropdown-item" onClick={(e) => handleItemClick(e.target.id)} id={column.id}>
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
            </div>
          </div>

          {/* change order */}
          <button className="button" onClick={() => setColumnOrder(["email"])}>
            Change order
          </button>
        </div>

        {/* globale filter */}
        <div>
          <span>Search Text : </span>
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl.id} colSpan={columnEl.colSpan}>
                  {columnEl.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}
                      {/* filter properties */}
                      {columnEl.column.getCanFilter() ? (
                        <div className="filterfunction">
                          <FilterFunction
                            column={columnEl.column}
                            table={tableInstance}
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => (
                <td key={cellEl.id}>
                  {flexRender(
                    cellEl.column.columnDef.cell,
                    cellEl.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottom-part">
        {/* pagination */}
        <div className="p-btn">
          <div className="page">
            {/* page size */}
            <h4>
              Current page size: {tableInstance.options.state.pagination.pageSize}
            </h4>
            <input
              type="number"
              placeholder="enter number of page"
              defaultValue={tableInstance.options.state.pagination.pageIndex}
              onChange={(e) => tableInstance.setPageIndex(e.target.value)}
            />
          </div>

          <div>
            <button
              className="btn2"
              onClick={() => tableInstance.setPageIndex(0)}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="btn2"
              onClick={() => tableInstance.previousPage()}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              Previous Page
            </button>
            <button
              className="btn2"
              onClick={() => tableInstance.nextPage()}
              disabled={!tableInstance.getCanNextPage()}
            >
              Next Page
            </button>

            <button
              className="btn2"
              onClick={() =>
                tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
              }
              disabled={!tableInstance.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicTable;
