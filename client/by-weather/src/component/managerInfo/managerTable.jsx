import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../css/manager.css"

function managerTable(props) {
  return (
    <>
      <div>
        <table className="managerTable">
          <tbody>
            {props.manager.map((item) => (
              <React.Fragment key={item.temperature} className="m_Table">
                <tr>
                  <td colSpan={3} className="td_temp">
                    <h2 className="td_temp_h2">온도 : {item.temperature}°C</h2>
                  </td>
                </tr>
                <tr className="tr_head">
                  <th>순위</th>
                  <th>패션</th>
                  <th>카운트</th>
                </tr>
                {item.fashion_list
                  .map((fashion) => fashion) // 복사본 만들기
                  .sort((a, b) => b.count - a.count || a.fashion.localeCompare(b.fashion)) // count가 같으면 이름순으로 정렬
                  .reduce((acc, fashion) => {
                    const prev = acc[acc.length - 1];
                    const rank = prev && prev.count === fashion.count ? prev.rank : acc.length + 1;
                    return [...acc, { ...fashion, rank }];
                  }, [])
                  .map((fashion) => (
                    <tr key={fashion.fashion}>
                      <td>{fashion.rank}</td>
                      <td>{fashion.fashion}</td>
                      <td>{fashion.count}</td>
                    </tr>
                  ))}
                <tr></tr> {/* 빈 tr 태그 추가 */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default managerTable;