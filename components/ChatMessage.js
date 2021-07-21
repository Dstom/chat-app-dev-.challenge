import { compareAsc, format, isToday, isYesterday } from 'date-fns'


const ChatMessage = ({ date, text, sender, id, senderProfile }) => {


   // const formattedDate = new Date(date);


    const formatDate = (incDate) => {

        const d = new Date(incDate)
        if (isToday(d)) {
            return `Today at ${format(d, 'kk:mm')}`;
          }
        
          if (isYesterday(d)) {
            return `Yesterday at ${format(d, 'kk:mm')}`;
          }
        
          return `${format(d, 'dd/MM/yyyy')} at ${format(d, 'kk:mm')}`;
    }
    return (
        <div className="flex gap-7 mb-9">
            <img className="rounded-lg h-11 w-11"
                src={senderProfile}
            />
            <div>
                <h1 className="text-gris text-lg font-bold"> {sender} <span className="text-sm font-medium">{formatDate(date)}</span> </h1>
                <p className="text-white break-all">{text}</p>
            </div>
        </div>
    );
}

export default ChatMessage;