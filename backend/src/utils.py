from datetime import datetime, UTC

def current_utc_timestamp():
    return int(datetime.now(UTC).timestamp())

def get_update_changes(old_task, update_set, fields):
    changes = {}
    for field in fields:
        old_value = getattr(old_task, field)
        new_value = getattr(update_set, field)
        if old_value != new_value:
            changes[field] = f"{old_value} -> {new_value}"
    return changes
