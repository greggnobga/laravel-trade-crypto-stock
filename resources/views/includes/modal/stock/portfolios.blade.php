<div class="stock-portfolio-insert">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="id">Order</label>
            <select name="order" class="modal-order" id="order">
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-symbol-label" for="symbol">Symbol</label>
            <input id="symbol" class="modal-symbol" name="symbol" type="text" placeholder="GTCAP" required/>
            <span class="modal-error modal-symbol-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="GT Capital Holdings Inc." required/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-fee-label" for="fee">Fee</label>
            <input id="coin" class="modal-fee" name="fee" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-fee-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-sharel-label" for="sharel">Share</label>
            <input id="share" class="modal-share" name="share" type="number" placeholder="0.00" required/>
            <span class="modal-error modal-share-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-insert" type="submit">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="stock-portfolio-update">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="id">Order</label>
            <select name="order" class="modal-order" id="order">
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-symbol-label" for="symbol">symbol</label>
            <input id="wallet" class="modal-symbol" name="symbol" type="text" placeholder="GTCAP" required/>
            <span class="modal-error modal-symbol-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="GT Capital Holdings Inc." required/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-fee-label" for="fee">Fee</label>
            <input id="coin" class="modal-fee" name="fee" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-fee-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-sharel-label" for="sharel">Share</label>
            <input id="share" class="modal-share" name="share" type="number" placeholder="0.00" required/>
            <span class="modal-error modal-share-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-update" type="submit">Update</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="stock-portfolio-destroy">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="id">Order</label>
            <select name="order" class="modal-order" id="order" disabled>
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-symbol-label" for="symbol">symbol</label>
            <input id="wallet" class="modal-symbol" name="symbol" type="text" placeholder="GTCAP" disabled/>
            <span class="modal-error modal-symbol-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="GT Capital Holdings Inc." disabled/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-fee-label" for="fee">Fee</label>
            <input id="coin" class="modal-fee" name="fee" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-fee-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-sharel-label" for="sharel">Share</label>
            <input id="share" class="modal-share" name="share" type="number" placeholder="0.00" disabled/>
            <span class="modal-error modal-share-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-destroy" type="submit">Destroy</button>
                </div>
            </div>
        </div>
    </div>
</div>
