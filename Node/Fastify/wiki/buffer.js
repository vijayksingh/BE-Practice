const buff = Buffer.alloc(8);

buff.write("Vijay", "utf-8")

const buff2 = Buffer.from("Singh", "utf-8") // will only allocate the needed memory

// The output for above is <Buffer 56 69 6a 61 79 00 00 00>
// It takes string "Vijay" -> utf-8 (convert into ) -> hexa-decimal

console.log(buff)
console.log(buff2)
console.log(buff.toJSON())