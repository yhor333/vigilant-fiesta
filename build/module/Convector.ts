class LengthConvector {
    lengths: any;
    constructor() {
        this.lengths = {
            ft: 3.2808,
            cm: 100,
            in: 39.37,
        }
    }
        
        private convertMtoLength(m: number, length: string): number {
            return m * this.lengths[length];
        }

        private convertLengthtoM(value:number, length: string): number {
            return value / this.lengths[length];
        }
        
    addLToConer(json: string) {
        const obj = JSON.parse(json)
        const {unit, cof} = obj
        this.lengths[unit] = cof;
        console.log(this.lengths)
    }

    private lengthCovert(unit: string, value: number, convert_to: string): string {
        const res = {
            unit: '',
            value: 0
        }
        res.unit = convert_to;
        if (unit !== 'm') {
            value = this.convertLengthtoM(value, unit);
            if (convert_to === 'm') {
                res.value = value;
                return JSON.stringify(res)
            }
        }
        unit = 'm';
        if (unit === 'm') {
            res.value = this.convertMtoLength(value, convert_to);
            return JSON.stringify(res)
        }
        return JSON.stringify(res)
    }

    covertJSON(json: string) {
        let {distance: {
            unit,
            value
        },
        convert_to
        } = JSON.parse(json);

        return this.lengthCovert(unit, value, convert_to)
    }
}


const Covector = new LengthConvector()


const jsonMtoIN =  JSON.stringify({"distance": {"unit": "m", "value": 1000}, "convert_to": "in"});
console.log(Covector.covertJSON(jsonMtoIN));
const MmJSON = JSON.stringify({unit: 'mm', cof: 1000});
const YdJSON = JSON.stringify({unit: 'yd', cof: 0.9144}); 
const kmJSON = JSON.stringify({unit: 'km', cof: 0.001});
Covector.addLToConer(MmJSON);
Covector.addLToConer(YdJSON);
Covector.addLToConer(kmJSON);
const jsonMMtoIN =  JSON.stringify({"distance": {"unit": "cm", "value": 1000}, "convert_to": "yd"});
console.log(Covector.covertJSON(jsonMMtoIN));
