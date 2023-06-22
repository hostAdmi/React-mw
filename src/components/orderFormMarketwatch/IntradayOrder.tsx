import React, { useEffect, useState } from 'react'
import PdfandExcel from './PdfandExcel'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
const IntradayOrder = () => {
  const { t } = useTranslation(["home"]);
  const [data, setData] = useState([])
   const dataInterday = async() => {
      const resultData = await axios.get("http://localhost:5000/Data")
      const data = resultData.data.Table
      setData(data)
      console.log("resultData",data)
    }
  useEffect(() => {
    dataInterday()
  }, [])
    const handleExportToExcel = (e: any) => {
    e.preventDefault();
    
    const table = document.getElementById("table-id");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.xlsx";
    link.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };

  const handleExportToPDF = () => {
    
    const table = document.getElementById("table-id");
    const doc: any = new jsPDF("p", "pt");
    doc.addFont("Helvetica", "Helvetica", "normal");
    doc.setFont("Helvetica");
    if (table) {
      doc.autoTable({
        html: table,
        startX: 20,
        styles: {
          size: 10,
          fontSize: 4,
          cellPadding: 6,
          fillColor: "gray",
          font: "Helvetica",
          lowercase: true,
        },
        tableWidth: "auto",
        margin: { top: 20 },
      });
    }
    doc.save("filename.pdf");
  };
  return (
    <div>
      <div className='flex justify-end mr-4'>
      <div>
          <div className="flex items-center gap-3 mt-2">
          <button className="p-1 pr-1 cursor-pointer  min-w-[40px] h-[30px] rounded-[4px] text-white text-[12px]  uppercase bg-[#0055ba]">
            {t("home:base.CapNhat")}
          </button>
          <form className="flex gap-2 mr-8">
            <img
              className="cursor-pointer "
              onClick={handleExportToExcel}
              src={excell}
              alt="excel"
            />
            <img
              className="cursor-pointer "
              onClick={handleExportToPDF}
              src={pfd}
              alt="pfd"
            />
          </form>
        </div>
    </div>
      </div>
      <div  className='mx-4 mt-1.5'>
        <table id='table-id'>
          <thead className='!bg-[#F3F3F3]'>
            <tr style={{border:"1px solid #dedede"}} className='border !bg-[#F3F3F3] py-1.3'>
            <th style={{border:"1px solid #dedede",width:"12.5%"}} className='font-bold text-black border shadow-sm text-md'>{t("home:base.Time")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='px-1 font-bold text-black border shadow-sm'>{t("home:Order.ORDER_MCK")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.LoaiGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm !px-1'>{t("home:Order.ORDER_LD")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.LoaiLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SoLuong")}</th>
            <th style={{border:"1px solid #dedede",width:"5.5%"}} className='!px-2 font-bold text-black border shadow-sm'>{t("home:base.Gia")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SanGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.TinhTrang")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.PhuongThucDatLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SHL0")}	</th>
            <th style={{border:"1px solid #dedede"}} className='px-1 font-bold text-black border shadow-sm'>{t("home:base.SHL")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.ThongBao")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => {
              return  <tr  style={{border:"1px solid #dedede"}} className='p-2 hover:bg-[#EEFFEE]' key={index}>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-2 !font-extralight'>{item.ADATETIME}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !font-[Arial] !text-left pl-1 !font-extralight'>{ item.ASTOCKCODE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1 !font-extralight'>Lệnh thường</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.ABUYSELL.toUpperCase() === "S" ? "Bán" : "Mua" }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.AORDERTYPE_VN}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-right pr-1 !font-extralight'>{ item.AQUANTITY}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-right pr-1 !font-extralight'> { item.APRICE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AEXCHANGE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AORDERSTATUS_VN }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{item.ATRADINGACCOUNT.charAt(0).toUpperCase() + item.ATRADINGACCOUNT.slice(1).toLowerCase()}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left !pl-1 !font-extralight'>{ item.AORIGORDERID}</th>
              <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1 w-[70px] !font-extralight'>{ item.AORIGORDERID}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1 !font-extralight'>{ item.AMESSAGE_VN}</th>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(IntradayOrder)