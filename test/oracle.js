import assert from "assert"
import { describe, it } from "node:test"
import { AO } from "wao"
import { acc } from "wao/test"
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
let oracle_data = readFileSync(join(__dirname, '../src/oracle.lua'), 'utf8')


describe("WAO", async () => {
    const ao = await new AO().init(acc[0])
    const _0RBT = ao.p("BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc")
    let pid;
    let p;
    try {
        const result = await ao.deploy({ src_data: oracle_data });
        pid = result.pid;
        p = result.p;
    } catch (e) {
        throw e
    }


    it("should spawn a process and send messages", async () => {
        let result;
        try {
            result = await p.d("Info", { get: "version" })
        } catch (e) {
            throw e
        }
        assert.strictEqual(result, "0.0.1")
    })

    it("should return with the price of AR", async () => {
        try {
            await _0RBT.m("Transfer", { Recipient: pid, Quantity: "1000000000000" })
        } catch (e) {
            throw e
        }

        let result;
        try {
            result = await p.m("Get-Request", {}, { check: "PriceFeed", get: "Price", timeout: 15000 })
        } catch (e) {
            await p.m("Transfer")
            throw e
        }
        console.log(result)
    })
})



