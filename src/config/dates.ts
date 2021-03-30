interface IDates {
  beginDate: Date;
  finalDate: Date;
}

export default {
  beginDate: new Date(process.env.BEGIN_DATE || '01/01/1990'),
  finalDate: new Date(process.env.END_DATE || '01/01/2000'),
} as IDates;
