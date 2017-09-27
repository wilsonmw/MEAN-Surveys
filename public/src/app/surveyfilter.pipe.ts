import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surveyfilter'
})
export class SurveyfilterPipe implements PipeTransform {

  transform(polls: Array<any>, value: string): any {
    if(!polls) return [];
    if(!value){
      return polls;
    }
    var filteredPolls = [];
    for(let blah of polls){
      console.log('hey: ', blah)
      if(blah.name.toLowerCase().includes(value.toLowerCase()) || blah.question.toLowerCase().includes(value.toLowerCase()) || blah.createdAt.toLowerCase().includes(value.toLowerCase())){
        filteredPolls.push(blah);
      }
    }
    return filteredPolls;
  }

}
