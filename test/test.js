import assert from "assert"
import { describe, it } from "node:test"
import { AO, acc } from "wao/test"
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
let main_data = readFileSync(join(__dirname, '../src/main.lua'), 'utf8')
let db_data = readFileSync(join(__dirname, '../src/db.lua'), 'utf8')




describe("WAO", function () {
    it("should spawn a process and send messages", async () => {
        const ao = await new AO().init(acc[0])

        const { p } = await ao.deploy({ src_data: main_data })
        const result = await p.d("Hello", { get: "Name" })
        assert.deepEqual(result, "Megabyte")

        await p.m("Hello", { check: { Name: "Megabyte" } })
    })

    it("should spawn two process and receive the correct data", async () => {
        const ao = await new AO().init(acc[0])

        const { p } = await ao.deploy({ src_data: main_data })

        const db_deploy = await ao.deploy({
            src_data: db_data
        })
        const db_id = db_deploy.pid;

        const age = await p.m(
            "Check-Age",
            { Who: "Bob", To: db_id },
            {
                check: "got your age!"
            }
        )
        console.log(age)
        // assert.strictEqual(age, "30")

    })
})

