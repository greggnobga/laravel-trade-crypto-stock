<div class="stock-watchlist-destroy">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-symbol-label" for="symbol"></label>
            <p class="modal-symbol-question">You are about to delete <span class="modal-symbol"></span>, are you sure you will not regret this action later?</p>
            <input id="id" class="modal-id" name="id" type="hidden" value="0"/>
            <input id="symbol" class="modal-symbol" name="symbol" type="hidden" value="0"/>
            <span class="modal-error modal-symbol-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-danger modal-destroy" type="submit">Destroy</button>
                </div>
            </div>
        </div>
    </div>
</div>