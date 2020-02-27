import React from 'react'

class ScreeningsPagination extends React.Component{

    render(){
        function setMonthName(month){
            let monthNames = [];
            monthNames[0] = 'Jan';
            monthNames[1] = 'Feb';
            monthNames[2] = 'Mar';
            monthNames[3] = 'Apr';
            monthNames[4] = 'May';
            monthNames[5] = 'Jun';
            monthNames[6] = 'Jul';
            monthNames[7] = 'Aug';
            monthNames[8] = 'Sep';
            monthNames[9] = 'Oct';
            monthNames[10] = 'Nov';
            monthNames[11] = 'Dec';

            return monthNames[month];
        }

        function getMonthIndex(month){
            switch(month){
                case 'Jan':
                    return 0;
                case 'Feb':
                    return 1;
                case 'Mar':
                    return 2;   
                case 'Apr':
                    return 3;
                case 'May':
                    return 4;
                case 'Jun':
                    return 5;
                case 'Jul':
                    return 6;
                case 'Aug':
                    return 7;
                case 'Sep':
                    return 8;
                case 'Oct':
                    return 9;
                case 'Nov':
                    return 10;
                case 'Dec':
                    return 11;
                default:
                    break;     
            }
        }

        let currentDate = new Date();
        let dateArray = [];

        for(let i = 0; i < 10; i++){
            if(i === 0){
                dateArray[i] = currentDate.getUTCDate() + '|' + setMonthName(currentDate.getUTCMonth());
            } else {
                currentDate.setDate(currentDate.getDate() + 1);
                dateArray[i] = currentDate.getUTCDate() + '|' + setMonthName(currentDate.getUTCMonth());
            }

        }

        let pages = dateArray.map((page, index) => {
            let date = page.split('|');
            return(
                <div key={index} onClick={() => this.props.handleDataButtonClick(date[0], getMonthIndex(date[1]))} className="date-button"><p>{date[0]}</p><p>{date[1]}</p></div>
            )
        });

        return(
            <div id="pages">
                {pages}
            </div>
        )
    }

}

export default ScreeningsPagination;