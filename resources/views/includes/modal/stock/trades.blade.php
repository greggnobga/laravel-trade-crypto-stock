<div class="stock-trade-insert">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Watch Stock</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="symbol">Symbol</label>
            <input id="id" class="modal-id" name="id" type="hidden" disabled/>
            <input id="sector" class="modal-sector" name="sector" type="hidden" disabled/>
            <input id="symbol" class="modal-symbol" name="symbol" type="text" disabled/>
            <span class="modal-error modal-symbol-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="edge">Edge ID</label>
            <div class="modal-gecko">
                <input id="edge" class="modal-edge" name="edge" type="text" placeholder="0" required/>
                <button class="btn btn-primary modal-fetch" type="submit">Fetch</button>
            </div>
            <span class="modal-error modal-edge-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="liabilities">Total Liabilities</label>
            <input id="liabilities" class="modal-liabilities" name="liabilities" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-liabilities-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="equity">Stake Holder Equity</label>
            <input id="equity" class="modal-equity" name="equity" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-equity-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="price">Last Traded Price</label>
            <input id="price" class="modal-price" name="price" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-price-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="earning">Earning Per Share</label>
            <input id="earning" class="modal-earning" name="earning" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-earning-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="income">Net Icome Before Tax</label>
            <input id="income" class="modal-income" name="net" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-income-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-label" for="gross">Gross Revenue</label>
            <input id="gross" class="modal-gross" name="gross" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-gross-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-insert" type="submit">Watch</button>
                </div>
            </div>
        </div>
    </div>
</div>