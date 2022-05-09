function send_slack_message() {
  var file_id = '<file_id>'
  var sheet = SpreadsheetApp.openById(file_id);
  var rows = sheet.getDataRange().getValues();
  var range = 'A1:P' + rows.length.toString();
  Logger.log(range);

  var target_range = sheet.getRange(range);


  sheet.getRange(range).getValues().forEach((row, index) => {
    if(row[12] == "" && row[15] == ""){
         Logger.log(row);
         rows[index][15] = "TRUE"
    }  
 });
 sheet.getRange(range).setValues(rows);

}

function send_message(row){
  const url = '<slack_hook>'
  var file_link = '<file_link>'

  var event_date = 
  Utilities.formatDate(new Date(row[5]), Session.getScriptTimeZone(), 'dd-MM-YYYY');
  var deadline = 
  Utilities.formatDate(new Date(row[9]), Session.getScriptTimeZone(), 'dd-MM-YYYY');
  var current_date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(),'dd-MM-YYYY');


         var data = {
          'text': '*Zatražio/la:* ' + row[1] + '\n'+ 
                  '*Događaj:* ' + row[4] + '\n'+ 
                  '*Datum događaja:* ' + event_date + '\n'+
                  '*Treba:* ' + row[10] + '\n' +
                  '*Treba do:* ' + deadline + '\n'+ 
                  '*Današnji datum:* ' + current_date  + '\n' +
                  '*Link na tablicu:* ' + file_link  + '\n'          
          
          }  

          var params = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(data)
          }

          var sendMsg = UrlFetchApp.fetch(url, params)
          var responseCode = sendMsg.getResponseCode()


}


